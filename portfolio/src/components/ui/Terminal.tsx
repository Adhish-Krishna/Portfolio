import { useState, useEffect, useRef, JSX } from 'react';
import { cn } from '../../lib/utils';
import { aboutData } from '../../data/about';
import { projects } from '../../data/projects';
import { experiences } from '../../data/experience';
import { educations } from '../../data/education';
import { TypewriterText } from './TypewriterText';

interface TerminalProps {
  className?: string;
  accentColor?: string;
  onExit?: () => void;
}

// Define the file system structure
const fileSystem = {
  home: {
    about: {
      'me.txt': aboutData.description,
      'skills.txt': aboutData.skills.join(', ')
    },
    projects: projects.reduce((acc: Record<string, string>, project) => {
      acc[`${project.title.toLowerCase().replace(/\s+/g, '-')}.txt`] =
        `Title: ${project.title}\n` +
        `Description: ${project.description}\n` +
        `Technologies: ${project.tags.join(', ')}\n` +
        (project.github ? `GitHub: ${project.github}\n` : '') +
        (project.link ? `Live Demo: ${project.link}` : '');
      return acc;
    }, {}),
    education: educations.reduce((acc: Record<string, string>, edu, index) => {
      acc[`${index + 1}-${edu.degree.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}.txt`] =
        `Institution: ${edu.institution}\n` +
        `Degree: ${edu.degree}\n` +
        `Period: ${edu.period}\n` +
        (edu.description ? `Description: ${edu.description}\n` : '') +
        (edu.gpa ? `GPA: ${edu.gpa}` : '');
      return acc;
    }, {}),
    experience: experiences.reduce((acc: Record<string, string>, exp, index) => {
      acc[`${index + 1}-${exp.title.toLowerCase().replace(/\s+/g, '-')}.txt`] =
        `Title: ${exp.title}\n` +
        `Company: ${exp.company}\n` +
        `Period: ${exp.period}\n` +
        `Description: ${exp.description}\n` +
        (exp.skills ? `Skills: ${exp.skills.join(', ')}` : '');
      return acc;
    }, {}),
    contact: {
      'email.txt': 'adhishthesak@gmail.com',
      'github.txt': 'https://github.com/Adhish-Krishna',
      'linkedin.txt': 'https://www.linkedin.com/in/adhish-krishna-a06844298/'
    },
    'README.md': `
# Welcome to Adhish Krishna's Portfolio Terminal

Use the following commands to navigate:
- \`ls\` - List files and directories
- \`cd <directory>\` - Change directory
- \`cat <filename>\` - View file contents
- \`vim <filename>\` - Open file in vim-like editor (type :q to exit)
- \`clear\` - Clear the terminal
- \`help\` - Display available commands
- \`exit\` - Exit terminal mode
- \`echo <string>\` - Prints the string to the console

Try exploring the directories to learn more about me:
- about/
- projects/
- education/
- experience/
- contact/
    `
  }
};

interface FileSystemNodeObject {
  [key: string]: FileSystemNode;
}
type FileSystemNode = string | FileSystemNodeObject;

export function Terminal({ className = '', accentColor = '#38d9f5', onExit }: TerminalProps) {
  const [currentPath, setCurrentPath] = useState<string[]>(['home']);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [commandOutput, setCommandOutput] = useState<JSX.Element[]>([
    <div key="welcome" className="mb-4">
      <TypewriterText
        text="Welcome to Adhish Krishna's Portfolio Terminal"
        speed={10}
        delay={100}
        className="text-green-400 font-bold"
      />
      <TypewriterText
        text="Type 'help' to see available commands or 'cat README.md' for more information"
        speed={10}
        delay={1000}
        className="text-neutral-400"
      />
    </div>
  ]);
  const [vimMode, setVimMode] = useState<boolean>(false);
  const [vimFile, setVimFile] = useState<string>('');
  const [vimContent, setVimContent] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom when new commands are executed
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandOutput]);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Automatically execute 'ls' command on mount for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      processCommand('ls');
    }, 2500); // After the welcome message type animation

    return () => clearTimeout(timer);
  }, []);

  // Function to get the current directory object
  const getCurrentDirectory = (): FileSystemNode => {
    let current: FileSystemNode = fileSystem;
    for (const dir of currentPath) {
      if (typeof current === 'object' && dir in current) {
        current = current[dir];
      }
    }
    return current;
  };

  // Helper function to get the directory object at a specific path
  const getCurrentDirectoryObject = (path: string[]): FileSystemNode => {
    let current: FileSystemNode = fileSystem;
    for (const dir of path) {
      if (typeof current === 'object' && dir in current) {
        current = current[dir];
      }
    }
    return current;
  };

  // Process command and update output
  const processCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);

    // If in vim mode, handle differently
    if (vimMode) {
      handleVimCommand(cmd);
      return;
    }

    // Special handling for echo command to preserve quotes
    if (cmd.trim().toLowerCase().startsWith('echo ')) {
      const echoContent = cmd.trim().substring(5).trim(); // Remove 'echo ' and trim
      setCommandOutput(prev => [
        ...prev,
        <div key={`cmd-${commandOutput.length}`} className="text-neutral-400 my-1">
          <span style={{ color: accentColor }}>adhish@portfolio</span>:<span className="text-blue-400">~/{currentPath.join('/')}</span>$ {cmd}
        </div>,
        handleEcho(echoContent)
      ]);
      setCurrentCommand('');
      return;
    }

    // Split command and arguments for other commands
    const [command, ...args] = cmd.trim().split(' ');

    // Process regular commands
    let output: JSX.Element;

    switch (command.toLowerCase()) {
      case 'ls':
        output = handleLs();
        break;
      case 'cd':
        output = handleCd(args[0]);
        break;
      case 'cat':
        output = handleCat(args[0]);
        break;
      case 'vim':
        output = handleVim(args[0]);
        return; // Return early as vim opens a new interface
      case 'clear':
        setCommandOutput([]);
        setCurrentCommand('');
        return;
      case 'help':
        output = handleHelp();
        break;
      case 'pwd':
        output = (
          <div key={`output-${commandOutput.length}`} className="text-neutral-200 my-1">
            /{currentPath.join('/')}
          </div>
        );
        break;
      case 'exit':
        handleExit();
        return;
      default:
        output = (
          <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
            Command not found: {command}. Type 'help' for available commands.
          </div>
        );
    }

    // Add command and its output to the terminal
    setCommandOutput(prev => [
      ...prev,
      <div key={`cmd-${commandOutput.length}`} className="text-neutral-400 my-1">
        <span style={{ color: accentColor }}>adhish@portfolio</span>:<span className="text-blue-400">~/{currentPath.join('/')}</span>$ {cmd}
      </div>,
      output
    ]);

    // Clear current command
    setCurrentCommand('');
  };

  // Smooth exit with animation
  const handleExit = () => {
    setVisible(false);
    setTimeout(() => {
      if (onExit) onExit();
    }, 300); // Match transition duration
  };

  // Command handlers
  const handleLs = () => {
    const currentDir = getCurrentDirectory();
    if (typeof currentDir === 'string') {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          Not a directory
        </div>
      );
    }

    // Group files and directories
    const dirs: string[] = [];
    const files: string[] = [];

    Object.entries(currentDir).forEach(([name, content]) => {
      if (typeof content === 'object') {
        dirs.push(name);
      } else {
        files.push(name);
      }
    });

    return (
      <div key={`output-${commandOutput.length}`} className="my-1 flex flex-wrap">
        {dirs.map((dir, i) => (
          <span key={`dir-${i}`} className="mr-4 mb-2 text-blue-400">{dir}/</span>
        ))}
        {files.map((file, i) => (
          <span key={`file-${i}`} className="mr-4 mb-2 text-neutral-200">{file}</span>
        ))}
      </div>
    );
  };

  const handleCd = (dir?: string) => {
    if (!dir || dir === '~') {
      setCurrentPath(['home']);
      return (
        <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
          Changed directory to /home
        </div>
      );
    }

    // Handle paths with trailing slashes
    if (dir.endsWith('/')) {
      dir = dir.slice(0, -1);
    }

    // Handle multiple directory traversals like "../../"
    if (dir.includes('../')) {
      // Split by / and count the number of .. segments
      const segments = dir.split('/').filter(Boolean);
      let levelsUp = 0;
      let remainingPath = [];

      for (const segment of segments) {
        if (segment === '..') {
          levelsUp++;
        } else {
          remainingPath.push(segment);
        }
      }

      // Make sure we don't go beyond the root
      if (levelsUp >= currentPath.length) {
        levelsUp = currentPath.length - 1; // Keep at least 'home'
      }

      // Calculate new path by going up levelsUp times, then appending remaining path
      const newPath = currentPath.slice(0, currentPath.length - levelsUp);

      // Check if remaining path exists (if any)
      if (remainingPath.length > 0) {
        let tempDir = getCurrentDirectoryObject(newPath);
        let valid = true;

        for (const segment of remainingPath) {
          if (typeof tempDir === 'object' && segment in tempDir && typeof tempDir[segment] === 'object') {
            tempDir = tempDir[segment] as FileSystemNodeObject;
          } else {
            valid = false;
            break;
          }
        }

        if (!valid) {
          return (
            <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
              Directory not found: {dir}
            </div>
          );
        }

        // All segments exist, update the path
        setCurrentPath([...newPath, ...remainingPath]);
        return (
          <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
            Changed directory to /{[...newPath, ...remainingPath].join('/')}
          </div>
        );
      }

      // Only had .. segments
      setCurrentPath(newPath);
      return (
        <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
          Changed directory to /{newPath.join('/')}
        </div>
      );
    }

    // Simple case: just ".."
    if (dir === '..') {
      if (currentPath.length > 1) {
        setCurrentPath(prev => prev.slice(0, -1));
        return (
          <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
            Changed directory to /{currentPath.slice(0, -1).join('/')}
          </div>
        );
      } else {
        return (
          <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
            Already at root directory
          </div>
        );
      }
    }

    // Navigate to specific directory
    const currentDir = getCurrentDirectory();
    if (typeof currentDir === 'object' && dir in currentDir && typeof currentDir[dir] === 'object') {
      setCurrentPath(prev => [...prev, dir]);
      return (
        <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
          Changed directory to /{[...currentPath, dir].join('/')}
        </div>
      );
    } else {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          Directory not found: {dir}
        </div>
      );
    }
  };

  const handleCat = (file?: string) => {
    if (!file) {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          Please specify a file
        </div>
      );
    }


    const currentDir = getCurrentDirectory();
    if (typeof currentDir === 'object' && file in currentDir && typeof currentDir[file] === 'string') {
      const content = currentDir[file] as string;

      // Special display for README.md with syntax highlighting
      if (file.endsWith('.md')) {
        return (
          <div key={`output-${commandOutput.length}`} className="my-1 text-neutral-200 markdown-content">
            <div className="font-bold text-lg mb-2" style={{ color: accentColor }}>
              {file}
            </div>
            <div className="whitespace-pre-wrap pl-2 border-l-2" style={{ borderColor: accentColor }}>
              {content}
            </div>
          </div>
        );
      }

      return (
        <div key={`output-${commandOutput.length}`} className="text-neutral-200 my-1 whitespace-pre-wrap">
          {content}
        </div>
      );
    } else {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          File not found: {file}
        </div>
      );
    }
  };

  const handleEcho = (str: string) => {
    // Remove surrounding quotes if present
    const content = str.replace(/^["'](.*)["']$/, '$1');

    return(
        <div key={`output-${commandOutput.length}`} className="text-neutral-200 my-1">
            {content}
         </div>
    );
  };

  const handleVim = (file?: string) => {
    if (!file) {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          Please specify a file
        </div>
      );
    }

    const currentDir = getCurrentDirectory();
    if (typeof currentDir === 'object' && file in currentDir && typeof currentDir[file] === 'string') {
      setVimMode(true);
      setVimFile(file);
      setVimContent(currentDir[file] as string);
      setCurrentCommand(''); // Clear the command input after opening vim

      // Don't return output, vim interface will take over
      return (
        <div key={`output-${commandOutput.length}`} className="text-neutral-400 my-1">
          Opening {file} in vim... (type :q to exit)
        </div>
      );
    } else {
      return (
        <div key={`output-${commandOutput.length}`} className="text-red-400 my-1">
          File not found: {file}
        </div>
      );
    }
  };

  const handleVimCommand = (cmd: string) => {
    // In a real vim, this would be more complex
    // Handle both with and without colon prefix for better user experience
    if (cmd === ':q' || cmd === ':q!' || cmd === 'q' || cmd === 'q!') {
      setVimMode(false);
      setVimFile('');
      setVimContent('');
      setCurrentCommand('');

      setCommandOutput(prev => [
        ...prev,
        <div key={`vim-exit-${commandOutput.length}`} className="text-neutral-400 my-1">
          Exited vim
        </div>
      ]);
    } else {
      // Show message about limited vim functionality
      setCommandOutput(prev => [
        ...prev,
        <div key={`vim-cmd-${commandOutput.length}`} className="text-yellow-400 my-1">
          Limited vim mode: Type "q" or ":q" and press Enter to exit
        </div>
      ]);
      setCurrentCommand('');
    }
  };

  const handleHelp = () => {
    return (
      <div key={`output-${commandOutput.length}`} className="text-neutral-200 my-1">
        <div className="font-bold mb-1" style={{ color: accentColor }}>Available Commands:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div><span className="font-mono font-bold">ls</span> - List files and directories</div>
          <div><span className="font-mono font-bold">cd &lt;directory&gt;</span> - Change directory</div>
          <div><span className="font-mono font-bold">cat &lt;filename&gt;</span> - View file contents</div>
          <div><span className="font-mono font-bold">vim &lt;filename&gt;</span> - Open file in vim-like editor</div>
          <div><span className="font-mono font-bold">echo &lt;"string"&gt;</span> - Prints string to the console</div>
          <div><span className="font-mono font-bold">pwd</span> - Print working directory</div>
          <div><span className="font-mono font-bold">clear</span> - Clear the terminal</div>
          <div><span className="font-mono font-bold">help</span> - Display this help message</div>
          <div><span className="font-mono font-bold">exit</span> - Exit terminal mode</div>
        </div>
        <div className="mt-2 text-neutral-400">
          Try exploring directories like about/, projects/, education/, experience/, and contact/
        </div>
      </div>
    );
  };

  // Handle command input submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(currentCommand);
  };

  // Handle key presses for command history navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle command history navigation (up/down arrows)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const prevCmd = commandHistory[commandHistory.length - 1];
        setCurrentCommand(prevCmd);
        setCommandHistory(prev => prev.slice(0, -1));
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for commands and directories
      const currentDir = getCurrentDirectory();
      if (typeof currentDir === 'object') {
        const partialCmd = currentCommand.split(' ');
        if (partialCmd.length > 1) {
          // Try to complete file/directory name
          const partial = partialCmd[partialCmd.length - 1];
          const matches = Object.keys(currentDir).filter(item => item.startsWith(partial));

          if (matches.length === 1) {
            partialCmd[partialCmd.length - 1] = matches[0];
            setCurrentCommand(partialCmd.join(' '));
          }
        }
      }
    }
  };

  // Render terminal or vim interface
  return (
    <div
      className={cn(
        "bg-[#0a1622] border border-[#171717] rounded-xl p-2 sm:p-4 overflow-hidden ai-box transition-all duration-300 relative",
        className,
        visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
      style={{
        borderColor: `${accentColor}40`,
        boxShadow: `0 4px 20px ${accentColor}10`,
        height: '80vh',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Exit button - Moved inside terminal for better mobile experience */}
      <div
        className="sticky top-2 right-2 z-20 float-right cursor-pointer ml-auto mb-2"
        onClick={handleExit}
      >
        <div
          className="flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-md transition-all duration-300 hover:bg-opacity-90"
          style={{
            backgroundColor: `${accentColor}20`,
            border: `1px solid ${accentColor}40`,
          }}
        >
          <span className="text-xs sm:text-sm font-medium" style={{ color: accentColor }}>
            Exit Dev Mode
          </span>
        </div>
      </div>

      {/* Terminal header */}
      <div className="flex items-center mb-2 pb-2 border-b border-neutral-800 clear-both">
        <div
          className="w-3 h-3 rounded-full bg-red-500 mr-2"
          onClick={handleExit}
          style={{ cursor: 'pointer' }}
          title="Exit terminal"
        />
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
        <div className="flex-1 text-center text-xs text-neutral-400 truncate">
          adhish@portfolio: ~/{currentPath.join('/')}
        </div>
      </div>

      {vimMode ? (
        /* Vim interface */
        <div className="flex-1 flex flex-col h-full">
          <div className="flex-1 bg-[#0a1622] p-2 font-mono text-sm text-neutral-200 overflow-auto whitespace-pre-wrap border border-neutral-700">
            {vimContent}
          </div>
          <div className="bg-[#1D2433] text-neutral-300 p-1 font-mono text-xs sm:text-sm flex items-center">
            <div className="flex-1 truncate">{vimFile} [Read Only]</div>
            <div className="text-green-400 whitespace-nowrap">-- NORMAL --</div>
          </div>
          {/* Vim help banner */}
          <div className="bg-[#0a1622] text-yellow-400 text-xs p-1 text-center border-t border-neutral-700">
            To exit vim, type q or :q and press Enter
          </div>
          <form onSubmit={handleCommandSubmit} className="flex mt-1">
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-neutral-200 font-mono pl-2 text-sm"
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Type q or :q to exit"
            />
          </form>
        </div>
      ) : (
        <>
          <div
            ref={terminalRef}
            className="flex-1 overflow-auto font-mono text-xs sm:text-sm"
            style={{ maxHeight: 'calc(80vh - 100px)' }}
          >
            {commandOutput}
          </div>
          <form onSubmit={handleCommandSubmit} className="flex mt-2 items-center overflow-hidden text-xs sm:text-sm">
            <span style={{ color: accentColor }} className="whitespace-nowrap">adhish@portfolio</span>
            <span className="text-blue-400 whitespace-nowrap overflow-hidden text-ellipsis">:~/{currentPath.join('/')}</span>
            <span className="text-neutral-400 mx-1 whitespace-nowrap">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none text-neutral-200 font-mono ml-1 min-w-0"
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </form>
        </>
      )}
    </div>
  );
}