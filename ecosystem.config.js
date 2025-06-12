module.exports = {
  apps: [
    {
      name: "moodsnap",
      cwd: ".", // project directory
      script: "bun",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3001, // change if you listen on another port
      },
      watch: false, // disable auto-reload
      max_memory_restart: "200M", // restart if it grows too big
    },
  ],
};
