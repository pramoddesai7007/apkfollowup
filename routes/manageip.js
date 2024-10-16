const express = require('express');
const fs = require('fs');
const path = require('path');
//const datas = require('../data');
const app = express();
const router = express.Router();

router.get('/ips', (req, res) => {
    const dataDir = path.join(__dirname, '../data');
    
    fs.readdir(dataDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read data directory' });
        }

        const companies = {};

        files.forEach(file => {
            if (file.endsWith('_ips.json')) {
                const companyName = file.replace('_ips.json', '');
                const filePath = path.join(dataDir, file);
                const data = fs.readFileSync(filePath, 'utf8');
                const ipList = JSON.parse(data).map(entry => entry.ip);
                companies[companyName] = ipList;
            }
        });

        res.json(companies);
    });
});

// New DELETE API
router.delete('/ips/:companyName/:ip', (req, res) => {
    const companyName = req.params.companyName;
    const ipToDelete = req.params.ip;
    const filePath = path.join(__dirname, '../data', `${companyName}_ips.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ message: 'Company or file not found' });
        }

        let ipList = JSON.parse(data);
        const initialLength = ipList.length;

        ipList = ipList.filter(entry => entry.ip !== ipToDelete);

        if (ipList.length === initialLength) {
            return res.status(404).json({ message: 'IP not found' });
        }

        fs.writeFile(filePath, JSON.stringify(ipList, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to update file' });
            }

            res.json({ message: `IP ${ipToDelete} deleted successfully` });
        });
    });
});

module.exports= router;