import axios from 'axios';

export const getUserIpAddress = async () => {
    try{
        const getIpReq = await axios.get(`https://geolocation-db.com/json/`);
        return {
            status: true,
            ip: getIpReq.data.IPv4
        }
    }
    catch(error){
        return {
            status: false,
            ip: '127.0.0.1'
        }
    }
}

export const downloadURL = async (url, file_name) => {
    fetch(url).then((response) => {
        response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            let alink = document.createElement("a");
            alink.href = fileURL;
            alink.download = `${file_name}.pdf`;
            alink.click();
        });
    });
};