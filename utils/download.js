import https from 'https';
import path from 'path';
import fs from 'fs';

export const downloadAndDetect = async function downloadAndDetect(url, downloadDir = './downloads') {
  // 从URL获取文件名和扩展名
  const filename = path.basename(new URL(url).pathname);
  const extension = path.extname(filename);
  
  // 如果没有扩展名，尝试从Content-Type判断
  let finalFilename = filename;
  if (!extension) {
    finalFilename = await getFilenameFromHeaders(url);
  }
  
  const filePath = path.join(downloadDir, finalFilename);
  
  // 确保下载目录存在
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  
  // 下载文件
  await downloadFile(url, filePath);
  
  // 返回文件信息
  return {
    url,
    filename: finalFilename,
    extension: path.extname(finalFilename).toLowerCase(),
    filePath,
    downloadTime: new Date().toISOString()
  };
}

export const getFilenameFromHeaders = async function getFilenameFromHeaders(url) {
  return new Promise((resolve) => {
    https.get(url, (response) => {
      const contentType = response.headers['content-type'];
      let extension = '.bin'; // 默认扩展名
      
      // 根据Content-Type猜测扩展名
      const contentTypes = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'image/bmp': '.bmp',
        
        // 视频
        'video/mp4': '.mp4',
        'video/avi': '.avi',
        'video/quicktime': '.mov',
        'video/x-ms-wmv': '.wmv',
        'video/x-flv': '.flv',
        'video/x-matroska': '.mkv',
        'video/webm': '.webm',
        
        // 音频
        'audio/mpeg': '.mp3',
        'audio/wav': '.wav',
        'audio/flac': '.flac',
        'audio/aac': '.aac',
        'audio/ogg': '.ogg',
        'audio/x-ms-wma': '.wma',
        'audio/mp4': '.m4a',

        // 字体
        'font/ttf': '.ttf',
        'font/otf': '.otf',
        'font/woff': '.woff',
        'font/woff2': '.woff2',
        'application/vnd.ms-fontobject': '.eot',
        'application/font-sfnt': '.sfnt',
        };
      
      if (contentType && contentTypes[contentType]) {
        extension = contentTypes[contentType];
      }
      
      resolve(`downloaded_file${extension}`);
    });
  });
}

export const downloadFile = async function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => resolve(filePath));
    }).on('error', reject);
  });
}

