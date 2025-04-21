const pty = require("node-pty");

const shell = pty.spawn("bash", [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: process.env,
});

if (!shell) {
  console.error("❌ PTY did not start.");
} else {
  console.log("✅ PTY process started.");
}

shell.onData((data) => {
  console.log("PTY Output:", data);
});

shell.write("ls\n"); // This should print files in your directory
