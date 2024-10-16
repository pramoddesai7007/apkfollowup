// const axios = require('axios');

// async function getLocation(ip) {
//   try {
//     const response = await axios.get(`http://ip-api.com/json/${ip}`);
//     console.log('API Response:', response.data);
//     const { lat, lon } = response.data;
//     if (!lat || !lon) {
//       throw new Error('Invalid coordinates received');
//     }
//     return { lat, long: lon };
//   } catch (error) {
//     console.error('Error fetching location:', error.message);
//     return null;
//   }
// }

// module.exports = getLocation;

const axios = require('axios');

async function getLocation(ip) {
  try {
    // Skip location fetching if IP is local or reserved
    if (ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      throw new Error('Local or reserved IP address');
    }

    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    console.log('API Response:', response.data);

    const { lat, lon, status } = response.data;

    if (status !== 'success' || !lat || !lon) {
      throw new Error('Invalid coordinates received');
    }

    return { lat, long: lon };
  } catch (error) {
    console.error('Error fetching location:', error.message);
    return null;
  }
}

module.exports = getLocation;

