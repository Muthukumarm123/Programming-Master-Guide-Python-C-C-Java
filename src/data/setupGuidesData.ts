import { SetupGuide } from '../types';

export const SETUP_GUIDES: SetupGuide[] = [
  // =========================================================================
  // 1. PYTHON & VS CODE
  // =========================================================================
  {
    id: 'setup-python-vscode',
    title: 'Python 3.12+ & Visual Studio Code',
    tool: 'CPython Interpreter & VS Code IDE',
    languageId: 'python',
    description: 'Complete cross-platform guide to installing the official CPython interpreter, configuring system PATH, setting up Visual Studio Code, and running your first script.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'You need CPython to parse, compile, and execute Python source code, and a reliable code editor with syntax highlighting, debugger, and terminal integration.',
    installation: {
      windows: {
        steps: [
          'Download the official Python installer from python.org (64-bit Windows installer).',
          'CRITICAL: Check the box "Add python.exe to PATH" at the bottom of the installer window before clicking Install Now.',
          'Click "Customize installation", ensure "pip", "tcl/tk and IDLE", and "Python test suite" are selected.',
          'Complete installation and click "Disable path length limit" on the final screen if prompted.',
          'Download and run the Visual Studio Code installer from code.visualstudio.com.',
          'Open VS Code, press Ctrl+Shift+X to open Extensions, search for "Python" by Microsoft, and click Install.',
        ],
        commands: [
          '# Open Command Prompt or PowerShell and verify:',
          'python --version',
          'pip --version',
        ],
        notes: 'If "python" is not recognized, re-run the installer and select Modify -> ensure Add to PATH is checked.',
      },
      linux: {
        steps: [
          'On Ubuntu/Debian, install Python 3, pip, and venv via the apt package manager.',
          'On Fedora/RHEL, use dnf install python3 python3-pip python3-devel.',
          'Install Visual Studio Code via official Snap or deb package.',
        ],
        commands: [
          'sudo apt update && sudo apt install -y python3 python3-pip python3-venv build-essential',
          'python3 --version',
          'pip3 --version',
        ],
        notes: 'On Linux, the binary is invoked as "python3" rather than "python".',
      },
      macos: {
        steps: [
          'Install the Homebrew package manager if not already present (brew.sh).',
          'Run brew install python to get the latest maintained CPython release.',
          'Install VS Code via Homebrew: brew install --cask visual-studio-code.',
        ],
        commands: [
          'brew install python',
          'python3 --version',
          'pip3 --version',
        ],
        notes: 'macOS ships with a stub python3 binary. Homebrew installs the full development version to /usr/local/bin or /opt/homebrew/bin.',
      },
    },
    configurationGuide: {
      pathInstructions: 'On Windows, ensure both "C:\\Users\\<Username>\\AppData\\Local\\Programs\\Python\\Python312\\" and "Scripts\\" are in your System Environment Variables under Path. On Linux/macOS, Homebrew or apt automatically configures /usr/bin or /opt/homebrew/bin in your shell profile.',
      ideIntegration: 'In VS Code, press Ctrl+Shift+P (Cmd+Shift+P on Mac), run "Python: Select Interpreter", and select the detected Python 3.12 environment.',
      compilerFlagsOrSettings: 'Create a .vscode/settings.json file with: {"python.analysis.typeCheckingMode": "basic", "editor.formatOnSave": true}.',
    },
    verification: {
      command: 'python --version || python3 --version',
      expectedOutput: 'Python 3.12.x (or higher)',
      sampleProgram: {
        filename: 'hello.py',
        code: 'import sys\n\nprint("Python installation verified successfully!")\nprint(f"Running on Python version: {sys.version.split()[0]}")\n',
        runCommand: 'python hello.py',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'On Windows, download the latest installer from python.org and select Upgrade. On macOS, run "brew upgrade python". On Linux, update through your distribution package manager.',
      howToRemoveSafely: 'On Windows, open Settings -> Installed Apps -> Python 3.12 -> Uninstall. On macOS, run "brew uninstall python". On Linux, do NOT remove the system python3 package as OS utilities depend on it.',
    },
    troubleshooting: [
      {
        problem: "'python' is not recognized as an internal or external command on Windows",
        cause: "The Python installation directory and Scripts directory were not appended to your Windows System PATH environment variable.",
        solution: "Search 'Environment Variables' in Windows Start menu -> Edit the System PATH variable -> Add C:\\Users\\<YourUser>\\AppData\\Local\\Programs\\Python\\Python312\\ and the Scripts\\ subfolder. Restart your terminal.",
      },
      {
        problem: "VS Code shows 'No Python interpreter selected'",
        cause: "VS Code hasn't detected your global or virtual environment executable path.",
        solution: "In VS Code, press Ctrl+Shift+P (Cmd+Shift+P on Mac), type 'Python: Select Interpreter', and choose the recommended Python 3.12 executable from the list.",
      },
    ],
    officialDocsUrl: 'https://docs.python.org/3/using/index.html',
  },

  // =========================================================================
  // 2. INTERACTIVE PYTHON (DATALUMINA WORKFLOW)
  // =========================================================================
  {
    id: 'setup-interactive-python',
    title: 'Interactive Python & IPython Environment',
    tool: 'Interactive REPL & IPython Shell',
    languageId: 'python',
    description: 'Setting up the interactive Python exploration workflow as referenced in DataLumina: persistent session state, rapid statement execution, and result inspection.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'Interactive programming lets you experiment with code line-by-line, inspect variable values immediately, and learn the language faster without re-running entire scripts from scratch.',
    installation: {
      windows: {
        steps: [
          'Ensure Python is installed with PATH enabled.',
          'Install the IPython interactive shell using pip for an enhanced terminal experience.',
          'In VS Code, install the "Jupyter" extension to run interactive code cells right inside your editor.',
        ],
        commands: [
          'pip install ipython',
          'ipython',
        ],
        notes: 'In VS Code, create a file ending in .py and type "# %%" above any block of code to turn it into an interactive cell!',
      },
      linux: {
        steps: [
          'Create a virtual environment or use pip3 with --user.',
          'Install IPython.',
        ],
        commands: [
          'python3 -m pip install ipython',
          'ipython3',
        ],
      },
      macos: {
        steps: [
          'Install IPython using Homebrew or pip3.',
        ],
        commands: [
          'pip3 install ipython',
          'ipython',
        ],
      },
    },
    configurationGuide: {
      pathInstructions: 'IPython is installed inside your active Python environment\'s Scripts/ or bin/ folder.',
      ideIntegration: 'In VS Code, install the "Jupyter" extension (ms-toolsai.jupyter). Open any .py file and select lines to press Shift+Enter, which automatically launches the interactive window.',
    },
    verification: {
      command: 'ipython --version',
      expectedOutput: '8.x.x',
      sampleProgram: {
        filename: 'interactive_demo.py',
        code: '# %% Cell 1: Define state\ncounter = 10\nname = "DataLumina Learner"\nprint(f"Initialized state: {name}, count={counter}")\n\n# %% Cell 2: Persistent modification\ncounter += 5\nprint(f"Updated counter: {counter}")\n',
        runCommand: 'Run in VS Code using Shift+Enter to execute line-by-line in the Interactive Window',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'Run "pip install --upgrade ipython".',
      howToRemoveSafely: 'Run "pip uninstall ipython".',
    },
    troubleshooting: [
      {
        problem: "NameError: name 'x' is not defined in interactive mode",
        cause: "A line referencing 'x' was executed before the cell or statement declaring 'x' was run, due to non-sequential execution.",
        solution: "Execute the cell defining 'x' first, or restart the interactive session kernel to reset all variables to a known clean state.",
      },
    ],
    officialDocsUrl: 'https://ipython.readthedocs.io/en/stable/',
  },

  // =========================================================================
  // 3. STREAMLIT APPLICATION FRAMEWORK
  // =========================================================================
  {
    id: 'setup-streamlit',
    title: 'Streamlit Web Application Framework',
    tool: 'Streamlit Framework & Development Server',
    languageId: 'python',
    description: 'Installing and running Streamlit locally to build modern interactive data applications in pure Python without writing HTML or JavaScript.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'Streamlit transforms Python data scripts into shareable web applications with interactive widgets, charts, and reactive session state.',
    installation: {
      windows: {
        steps: [
          'Open your project folder in terminal or VS Code.',
          'Create and activate a clean Python virtual environment.',
          'Install streamlit via pip.',
        ],
        commands: [
          'python -m venv .venv',
          '.venv\\Scripts\\activate',
          'pip install streamlit',
        ],
      },
      linux: {
        steps: [
          'Create virtual environment and install streamlit.',
        ],
        commands: [
          'python3 -m venv .venv',
          'source .venv/bin/activate',
          'pip install streamlit',
        ],
      },
      macos: {
        steps: [
          'Create virtual environment and install streamlit.',
        ],
        commands: [
          'python3 -m venv .venv',
          'source .venv/bin/activate',
          'pip install streamlit',
        ],
      },
    },
    configurationGuide: {
      pathInstructions: 'Streamlit runs inside the project virtual environment.',
      ideIntegration: 'Configure a .streamlit/config.toml file: [server]\nheadless = true\nenableCORS = false',
    },
    verification: {
      command: 'streamlit hello',
      expectedOutput: 'Welcome to Streamlit. View your app in browser: http://localhost:8501',
      sampleProgram: {
        filename: 'app.py',
        code: 'import streamlit as st\n\nst.title("Streamlit Environment Verified")\nname = st.text_input("Enter your name:", value="Developer")\nif st.button("Say Hello"):\n    st.success(f"Hello, {name}! Streamlit is fully configured.")\n',
        runCommand: 'streamlit run app.py',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'Run "pip install --upgrade streamlit" inside your active virtual environment.',
      howToRemoveSafely: 'Run "pip uninstall streamlit" or delete the .venv folder.',
    },
    troubleshooting: [
      {
        problem: "Port 8501 already in use",
        cause: "Another Streamlit application or process is holding default port 8501.",
        solution: "Specify a custom port: streamlit run app.py --server.port 8502",
      },
    ],
    officialDocsUrl: 'https://docs.streamlit.io/get-started',
  },

  // =========================================================================
  // 4. PYTHON BACKEND (FLASK, DJANGO, FASTAPI)
  // =========================================================================
  {
    id: 'setup-python-backend',
    title: 'Python Backend: Flask, Django & FastAPI',
    tool: 'Web Frameworks & ASGI/WSGI Servers',
    languageId: 'python',
    description: 'Installing the three primary Python backend development frameworks: Flask (microframework), Django (full-stack), and FastAPI with Uvicorn (high-concurrency async).',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'Backend frameworks handle HTTP requests, routing, database ORMs, authentication, and REST APIs that power modern web and mobile apps.',
    installation: {
      windows: {
        steps: [
          'Activate your project virtual environment (.venv).',
          'Install Flask, Django, and FastAPI with the Uvicorn ASGI server.',
        ],
        commands: [
          'pip install flask django "fastapi[standard]" uvicorn requests sqlalchemy',
        ],
      },
      linux: {
        steps: [
          'Activate virtual environment and install packages.',
        ],
        commands: [
          'pip install flask django "fastapi[standard]" uvicorn requests sqlalchemy',
        ],
      },
      macos: {
        steps: [
          'Activate virtual environment and install packages.',
        ],
        commands: [
          'pip3 install flask django "fastapi[standard]" uvicorn requests sqlalchemy',
        ],
      },
    },
    configurationGuide: {
      pathInstructions: 'Ensure virtual environment scripts are activated before launching servers.',
      ideIntegration: 'In VS Code, add launch configurations in .vscode/launch.json for FastAPI: {"name": "FastAPI", "type": "debugpy", "request": "launch", "module": "uvicorn", "args": ["main:app", "--reload"]}.',
    },
    verification: {
      command: 'python -c "import flask, django, fastapi; print(\'Flask, Django, FastAPI successfully imported\')"',
      expectedOutput: 'Flask, Django, FastAPI successfully imported',
      sampleProgram: {
        filename: 'fastapi_main.py',
        code: 'from fastapi import FastAPI\n\napp = FastAPI(title="Verification API")\n\n@app.get("/")\ndef root():\n    return {"status": "online", "message": "Backend environment verified"}\n',
        runCommand: 'uvicorn fastapi_main:app --reload --port 8000',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'Run "pip install --upgrade flask django fastapi uvicorn".',
      howToRemoveSafely: 'Run "pip uninstall flask django fastapi uvicorn".',
    },
    troubleshooting: [
      {
        problem: "ModuleNotFoundError: No module named 'fastapi'",
        cause: "Your terminal has not activated the virtual environment where the packages were installed.",
        solution: "Run 'source .venv/bin/activate' (or '.venv\\Scripts\\activate' on Windows) in your terminal before launching the server.",
      },
    ],
    officialDocsUrl: 'https://fastapi.tiangolo.com/tutorial/',
  },

  // =========================================================================
  // 5. DEDICATED JAVA JDK 21 LTS & IDE CONFIGURATION
  // =========================================================================
  {
    id: 'setup-java-jdk',
    title: 'Java Development Kit (JDK 21 LTS) & IDE Environment',
    tool: 'Eclipse Temurin / OpenJDK 21 LTS & IDE Tooling',
    languageId: 'java',
    description: 'Comprehensive installation of the official OpenJDK/Eclipse Temurin Java 21 LTS kit, system JAVA_HOME and PATH configuration across Windows, macOS, and Linux, and setting up VS Code or IntelliJ IDEA.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'The JDK provides the Java compiler (javac), the Java Virtual Machine (JVM), the Java runtime libraries, and development utilities required to compile Java source into bytecode and run enterprise Spring Boot backends.',
    installation: {
      windows: {
        steps: [
          'Download Eclipse Temurin JDK 21 LTS (MSI installer) from adoptium.net.',
          'Run the installer. In the "Custom Setup" feature tree, ensure "Set JAVA_HOME variable" and "Add to PATH" are set to "Will be installed on local hard drive".',
          'Complete the installation wizard.',
          'Close and reopen any open Command Prompt or PowerShell windows so the new environment variables take effect.',
          'IDE Setup: Download IntelliJ IDEA Community Edition from jetbrains.com, or install the "Extension Pack for Java" by Microsoft inside Visual Studio Code.',
        ],
        commands: [
          '# Verify in Command Prompt or PowerShell:',
          'javac -version',
          'java -version',
          'echo %JAVA_HOME%',
        ],
        notes: 'If JAVA_HOME is blank, search "Environment Variables" in Start menu, add a new System Variable named JAVA_HOME pointing to C:\\Program Files\\Eclipse Adoptium\\jdk-21.x.x-hotspot\\.',
      },
      linux: {
        steps: [
          'On Ubuntu/Debian, install OpenJDK 21 JDK and Maven build tool via apt.',
          'On Fedora/RHEL, use sudo dnf install java-21-openjdk-devel maven.',
          'Configure JAVA_HOME in your user shell profile (~/.bashrc or ~/.zshrc).',
        ],
        commands: [
          'sudo apt update && sudo apt install -y openjdk-21-jdk maven',
          '# Add to ~/.bashrc:',
          'echo "export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" >> ~/.bashrc',
          'echo "export PATH=\\$JAVA_HOME/bin:\\$PATH" >> ~/.bashrc',
          'source ~/.bashrc',
          'javac -version && java -version',
        ],
        notes: 'Use "sudo update-alternatives --config java" if multiple Java versions are installed on your Linux system.',
      },
      macos: {
        steps: [
          'Install OpenJDK 21 using Homebrew package manager.',
          'Create a symlink so macOS recognizes the JDK in its system JavaVirtualMachines directory.',
          'Set JAVA_HOME dynamically using /usr/libexec/java_home.',
        ],
        commands: [
          'brew install openjdk@21',
          'sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk',
          '# Add to ~/.zshrc:',
          'echo \'export JAVA_HOME=$(/usr/libexec/java_home -v 21)\' >> ~/.zshrc',
          'source ~/.zshrc',
          'javac -version && java -version',
        ],
        notes: 'On Intel Macs, Homebrew installs to /usr/local/opt/openjdk@21; on Apple Silicon (M1/M2/M3), it installs to /opt/homebrew/opt/openjdk@21.',
      },
    },
    configurationGuide: {
      pathInstructions: 'JAVA_HOME must point to the root directory of the JDK installation (not the bin directory). Your system PATH must include "%JAVA_HOME%\\bin" (Windows) or "$JAVA_HOME/bin" (Linux/macOS).',
      ideIntegration: 'In VS Code, install the "Extension Pack for Java" (vscjava.vscode-java-pack). In IntelliJ IDEA, open File -> Project Structure -> SDKs, click "+", and select the JDK 21 home directory.',
      compilerFlagsOrSettings: 'To enable modern preview features, compile with "javac --enable-preview --release 21" and run with "java --enable-preview".',
    },
    verification: {
      command: 'javac -version && java -version',
      expectedOutput: 'javac 21.0.x\nopenjdk version "21.0.x" ... OpenJDK Runtime Environment Temurin-21...',
      sampleProgram: {
        filename: 'VerifyJava.java',
        code: `public class VerifyJava {
    public static void main(String[] args) {
        System.out.println("Java JDK 21 toolchain verified successfully!");
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("Java Vendor: " + System.getProperty("java.vendor"));
        System.out.println("JVM Architecture: " + System.getProperty("os.arch"));
    }
}`,
        runCommand: 'javac VerifyJava.java && java VerifyJava',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'On Windows, run the installer for the newer minor version (e.g. 21.0.3 to 21.0.4) and update JAVA_HOME. On macOS, run "brew upgrade openjdk@21". On Linux, run "sudo apt update && sudo apt upgrade openjdk-21-jdk".',
      howToRemoveSafely: 'On Windows, uninstall through Settings -> Installed Apps -> Eclipse Temurin JDK. On macOS, run "brew uninstall openjdk@21" and remove the symlink. On Linux, run "sudo apt remove openjdk-21-jdk".',
    },
    troubleshooting: [
      {
        problem: "'javac' is not recognized as an internal or external command on Windows",
        cause: "The JDK 'bin' directory is not in your system PATH variable, or only the standalone JRE was installed instead of the full JDK.",
        solution: "Open System Properties -> Environment Variables -> Edit System PATH -> Add '%JAVA_HOME%\\bin'. Ensure you downloaded the JDK (Development Kit), not just the JRE.",
      },
      {
        problem: "UnsupportedClassVersionError: has been compiled by a more recent version of the Java Runtime",
        cause: "The class file was compiled with a newer JDK (e.g. Java 21) but executed with an older JRE (e.g. Java 11 or 17).",
        solution: "Verify that 'java -version' and 'javac -version' output the exact same major version (21). Align your JAVA_HOME and PATH.",
      },
    ],
    officialDocsUrl: 'https://adoptium.net/temurin/releases/',
  },

  // =========================================================================
  // 6. DEDICATED C COMPILER INSTALLATION (GCC & CLANG)
  // =========================================================================
  {
    id: 'setup-c-compiler',
    title: 'C Compiler Installation (GCC & Clang)',
    tool: 'GCC (MinGW-w64), Clang & GDB Toolchain',
    languageId: 'c',
    description: 'Detailed guide to installing modern C compilers (GCC / Clang) across Windows, Linux, and macOS, configuring system PATH, setting up standard compiler flags, and compiling C programs.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'C is a compiled language producing native machine code. You require a C compiler (gcc or clang) to execute the preprocessing, compilation, assembly, and linking stages into an operating system binary.',
    installation: {
      windows: {
        steps: [
          'Option A (Recommended & Cleanest): Download MSYS2 from msys2.org and run the installer (installs to C:\\msys64).',
          'At the end of installation, open the MSYS2 UCRT64 terminal.',
          'Install the MinGW-w64 GCC toolchain, GDB debugger, and Make build tool using the pacman package manager command below.',
          'Add C:\\msys64\\ucrt64\\bin to your Windows System PATH environment variable.',
          'Option B (Alternative single zip): Download WinLibs MinGW-w64 standalone from winlibs.com, extract to C:\\winlibs, and add C:\\winlibs\\bin to PATH.',
          'Close and reopen your terminal or Command Prompt.',
        ],
        commands: [
          '# Inside MSYS2 UCRT64 terminal:',
          'pacman -Syu',
          'pacman -S mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-gdb mingw-w64-ucrt-x86_64-make',
          '# Then in Command Prompt or PowerShell, verify:',
          'gcc --version',
          'gdb --version',
        ],
        notes: 'UCRT (Universal C Runtime) is Microsoft\'s modern C runtime library on Windows 10/11, superior to legacy MSVCRT.',
      },
      linux: {
        steps: [
          'On Ubuntu/Debian, install the "build-essential" meta-package which contains GCC, G++, Make, and standard C library headers.',
          'Install Clang and GDB for debugging.',
        ],
        commands: [
          'sudo apt update && sudo apt install -y build-essential gcc gdb clang valgrind',
          'gcc --version',
          'clang --version',
        ],
        notes: 'build-essential includes libc6-dev headers. Without these, compiling any program including <stdio.h> will fail.',
      },
      macos: {
        steps: [
          'Install Apple\'s Command Line Tools which provide Apple Clang (LLVM) and LLDB.',
          'Run the xcode-select command in Terminal and click "Install" in the software update dialog.',
        ],
        commands: [
          'xcode-select --install',
          '# After installation finishes, verify:',
          'clang --version',
          'gcc --version  # Note: on macOS, "gcc" is a symlink to Apple Clang',
        ],
        notes: 'If you need genuine GNU GCC on macOS (e.g. GCC 13/14), install it via Homebrew: "brew install gcc".',
      },
    },
    configurationGuide: {
      pathInstructions: 'On Windows, ensure "C:\\msys64\\ucrt64\\bin" is listed in your System PATH. On Linux and macOS, gcc and clang are placed in /usr/bin automatically.',
      ideIntegration: 'In VS Code, install the "C/C++" extension by Microsoft (ms-vscode.cpptools). Configure .vscode/tasks.json to invoke gcc with: ["-Wall", "-Wextra", "-O2", "${file}", "-o", "${fileDirname}/${fileBasenameNoExtension}"].',
      compilerFlagsOrSettings: 'Always compile C code with strict warning flags: "gcc -std=c17 -Wall -Wextra -pedantic main.c -o main". For debugging, add "-g3 -fsanitize=address".',
    },
    verification: {
      command: 'gcc --version || clang --version',
      expectedOutput: 'gcc (Rev...) 13.x.x (or higher) or Apple clang version ... Target: x86_64 or aarch64',
      sampleProgram: {
        filename: 'verify_c.c',
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    printf("=== C Compiler Toolchain Verified Successfully! ===\\n");
    #ifdef __STDC_VERSION__
        printf("Standard C Version Macro (__STDC_VERSION__): %ld\\n", __STDC_VERSION__);
    #endif
    printf("Pointer Size on this Architecture: %zu bytes (%zu-bit system)\\n", 
           sizeof(void*), sizeof(void*) * 8);

    // Test dynamic heap memory allocation
    int *test_heap = (int *)malloc(sizeof(int) * 3);
    if (test_heap == NULL) {
        fprintf(stderr, "Heap allocation failed!\\n");
        return 1;
    }
    test_heap[0] = 100;
    test_heap[1] = 200;
    test_heap[2] = 300;
    printf("Heap Test: %d, %d, %d\\n", test_heap[0], test_heap[1], test_heap[2]);
    free(test_heap);

    return 0;
}`,
        runCommand: 'gcc -std=c17 -Wall -Wextra verify_c.c -o verify_c && ./verify_c',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'On Windows MSYS2, open UCRT64 terminal and run "pacman -Syu". On Linux, run "sudo apt update && sudo apt upgrade gcc". On macOS, update Xcode Command Line Tools via Software Update.',
      howToRemoveSafely: 'On Windows, delete C:\\msys64 and remove its bin path from Environment Variables. On Linux, run "sudo apt remove gcc build-essential".',
    },
    troubleshooting: [
      {
        problem: "fatal error: stdio.h: No such file or directory",
        cause: "The C standard library headers (libc) are missing from the compiler search path.",
        solution: "On Linux, run 'sudo apt install libc6-dev'. On Windows, verify you installed mingw-w64-ucrt-x86_64-gcc through MSYS2 rather than an isolated binary.",
      },
      {
        problem: "undefined reference to 'sin' or 'pow' (Linker Error)",
        cause: "In GCC on Linux, the C math library is not linked automatically.",
        solution: "Append '-lm' to the end of your compile command: 'gcc main.c -o main -lm'.",
      },
    ],
    officialDocsUrl: 'https://gcc.gnu.org/onlinedocs/',
  },

  // =========================================================================
  // 7. DEDICATED MODERN C++ COMPILER INSTALLATION (G++, CLANG++, MSVC)
  // =========================================================================
  {
    id: 'setup-cpp-compiler',
    title: 'Modern C++ Compiler Installation (g++, clang++, MSVC)',
    tool: 'Modern C++20 / C++17 Toolchain & IDE Setup',
    languageId: 'cpp',
    description: 'Setting up modern C++ compilers (GCC g++, Clang++, MSVC) with C++20 standard support, configuring VS Code c_cpp_properties.json, and compiling RAII & smart pointer programs.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'Modern C++ (C++11 through C++20) requires a compliant C++ compiler (g++, clang++, or cl.exe) to compile templates, RAII destructors, and the Standard Template Library (STL).',
    installation: {
      windows: {
        steps: [
          'Option A (MinGW-w64 via MSYS2): Install MSYS2 from msys2.org. In the UCRT64 terminal, install mingw-w64-ucrt-x86_64-gcc (which includes g++).',
          'Add C:\\msys64\\ucrt64\\bin to Windows System PATH.',
          'Option B (Industry standard Microsoft Visual C++ - MSVC): Download Visual Studio Community installer from visualstudio.microsoft.com. In the installer, select the workload "Desktop development with C++" and complete setup.',
          'To use MSVC from terminal, open "Developer Command Prompt for VS 2022" from the Start menu.',
        ],
        commands: [
          '# In Command Prompt or PowerShell (for GCC):',
          'g++ --version',
          '# Or in Developer Command Prompt (for MSVC):',
          'cl',
        ],
        notes: 'MSVC is the de facto standard for Windows desktop development, DirectX, and game engines (Unreal Engine). MinGW-w64 is excellent for cross-platform open-source code.',
      },
      linux: {
        steps: [
          'On Ubuntu/Debian, install g++ and clang++ through apt.',
          'Verify g++ version supports C++20 (GCC 11 or higher supports full C++20).',
        ],
        commands: [
          'sudo apt update && sudo apt install -y g++ clang++ cmake',
          'g++ --version',
          'clang++ --version',
        ],
        notes: 'Always specify the standard flag: g++ -std=c++20 main.cpp -o main.',
      },
      macos: {
        steps: [
          'Apple Clang comes with Command Line Tools (xcode-select --install).',
          'Apple Clang 14+ supports C++20 features.',
        ],
        commands: [
          'clang++ --version',
          '# Compile using:',
          'clang++ -std=c++20 main.cpp -o main',
        ],
        notes: 'Apple Clang implements libc++ with broad C++20 support.',
      },
    },
    configurationGuide: {
      pathInstructions: 'Add the compiler bin folder (e.g. C:\\msys64\\ucrt64\\bin) to system PATH.',
      ideIntegration: 'In VS Code, install "C/C++" (ms-vscode.cpptools). Create .vscode/c_cpp_properties.json: {"configurations": [{"name": "Win32", "compilerPath": "C:/msys64/ucrt64/bin/g++.exe", "cStandard": "c17", "cppStandard": "c++20", "intelliSenseMode": "windows-gcc-x64"}]}.',
      compilerFlagsOrSettings: 'Always compile with modern standards: "g++ -std=c++20 -Wall -Wextra -O2 main.cpp -o main".',
    },
    verification: {
      command: 'g++ --version || clang++ --version',
      expectedOutput: 'g++ (Rev...) 13.x.x or clang++ version ... Target: ...',
      sampleProgram: {
        filename: 'verify_cpp.cpp',
        code: `#include <iostream>
#include <vector>
#include <memory>
#include <string>

struct Node {
    std::string name;
    Node(std::string n) : name(std::move(n)) {
        std::cout << "  [Constructed] " << name << "\\n";
    }
    ~Node() {
        std::cout << "  [RAII Destroyed] " << name << "\\n";
    }
};

int main() {
    std::cout << "=== Modern C++20 Toolchain Verified Successfully! ===\\n";
    std::cout << "C++ Standard Macro (__cplusplus): " << __cplusplus << "\\n";

    // Test C++11/C++14 smart pointers and C++20 range loop
    std::vector<std::unique_ptr<Node>> nodes;
    nodes.push_back(std::make_unique<Node>("Node-Alpha"));
    nodes.push_back(std::make_unique<Node>("Node-Beta"));

    std::cout << "Node count in vector: " << nodes.size() << "\\n";
    std::cout << "Leaving main scope (destructors will fire automatically via RAII):\\n";
    return 0;
}`,
        runCommand: 'g++ -std=c++20 -Wall -Wextra verify_cpp.cpp -o verify_cpp && ./verify_cpp',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'On Windows MSYS2, run "pacman -Syu". In Visual Studio Installer, click Update. On Linux, run "sudo apt update && sudo apt upgrade g++".',
      howToRemoveSafely: 'On Windows Visual Studio, open Visual Studio Installer -> More -> Uninstall. On Linux, run "sudo apt remove g++".',
    },
    troubleshooting: [
      {
        problem: "__cplusplus reports 199711L instead of C++20 in MSVC",
        cause: "By default, MSVC defines __cplusplus as 199711L for legacy compatibility unless the /Zc:__cplusplus compiler flag is passed.",
        solution: "Compile with: 'cl /std:c++20 /Zc:__cplusplus main.cpp'.",
      },
      {
        problem: "error: 'make_unique' is not a member of 'std'",
        cause: "Your compiler is defaulting to legacy C++98 or C++03 mode because the -std=c++14 or -std=c++20 flag was omitted.",
        solution: "Explicitly pass '-std=c++20' to g++ or clang++.",
      },
    ],
    officialDocsUrl: 'https://en.cppreference.com/w/cpp/compiler_support',
  },

  // =========================================================================
  // 8. DEDICATED NATIVE BUILD TOOLS & DEBUGGERS (MAKE, CMAKE, GDB, LLDB)
  // =========================================================================
  {
    id: 'setup-build-tools',
    title: 'Native Build Tools & Debuggers (Make, CMake, GDB, LLDB)',
    tool: 'Make, CMake 3.25+, GDB & LLDB Debuggers',
    languageId: 'c',
    description: 'Setting up build automation and interactive native debuggers for multi-file C and C++ projects, setting breakpoints, inspecting memory, and automated CMake build configurations.',
    supportedOS: ['Windows', 'macOS', 'Linux'],
    whyNeeded: 'As C and C++ projects grow beyond single files, manual compiler commands become unmanageable. CMake and Make automate compilation dependency tracking, while GDB and LLDB let you set breakpoints, step through machine instructions, and inspect pointer memory.',
    installation: {
      windows: {
        steps: [
          'In MSYS2 UCRT64 terminal, install CMake and Make: pacman -S mingw-w64-ucrt-x86_64-cmake mingw-w64-ucrt-x86_64-make mingw-w64-ucrt-x86_64-gdb.',
          'Verify that cmake, mingw32-make, and gdb are accessible in Command Prompt.',
        ],
        commands: [
          'cmake --version',
          'gdb --version',
        ],
      },
      linux: {
        steps: [
          'Install CMake, Make, and GDB via apt package manager.',
        ],
        commands: [
          'sudo apt update && sudo apt install -y cmake make gdb lldb valgrind',
          'cmake --version && gdb --version',
        ],
      },
      macos: {
        steps: [
          'Install CMake using Homebrew. LLDB is included with Apple Command Line Tools.',
        ],
        commands: [
          'brew install cmake',
          'cmake --version',
          'lldb --version',
        ],
      },
    },
    configurationGuide: {
      pathInstructions: 'Ensure cmake and make executable directories are included in your System PATH.',
      ideIntegration: 'In VS Code, install "CMake Tools" (ms-vscode.cmake-tools). It provides one-click build and debug targets directly on the bottom status bar.',
    },
    verification: {
      command: 'cmake --version && gdb --version || lldb --version',
      expectedOutput: 'cmake version 3.x.x\nGNU gdb (GDB) ... or lldb version ...',
      sampleProgram: {
        filename: 'CMakeLists.txt',
        code: `cmake_minimum_required(VERSION 3.20)
project(VerifyBuildTools C CXX)

set(CMAKE_C_STANDARD 17)
set(CMAKE_CXX_STANDARD 20)

add_executable(my_program verify_cpp.cpp)`,
        runCommand: 'cmake -B build && cmake --build build',
      },
    },
    updateAndRemoval: {
      howToUpdate: 'On Windows MSYS2, run "pacman -Syu cmake". On Linux, run "sudo apt update && sudo apt upgrade cmake". On macOS, run "brew upgrade cmake".',
      howToRemoveSafely: 'Uninstall via package manager or Homebrew.',
    },
    troubleshooting: [
      {
        problem: "CMake Error: No CMAKE_C_COMPILER could be found",
        cause: "CMake cannot find gcc, clang, or cl.exe in your System PATH.",
        solution: "Specify the compiler explicitly: 'cmake -B build -DCMAKE_C_COMPILER=gcc -DCMAKE_CXX_COMPILER=g++'.",
      },
    ],
    officialDocsUrl: 'https://cmake.org/documentation/',
  },
];
