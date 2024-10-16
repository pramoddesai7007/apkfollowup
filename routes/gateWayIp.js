const { exec } = require('child_process');
const os = require('os');
const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
  const platform = os.platform();

  let command;
  if (platform === 'win32') {
    command = 'route print | findstr /C:"0.0.0.0"';
  } else {
    command = 'ip route | grep default';
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Failed to fetch IP configuration' });
    }

    let match;
    if (platform === 'win32') {
      match = stdout.match(/0\.0\.0\.0\s+0\.0\.0\.0\s+(\d+\.\d+\.\d+\.\d+)/);
    } else {
      match = stdout.match(/default via (\d+\.\d+\.\d+\.\d+)/);
    }

    if (match && match[1]) {
      return res.status(200).json({ gatewayIp: match[1] });
    }

    return res.status(500).json({ error: 'Default Gateway not found' });
  });
});

module.exports = router;