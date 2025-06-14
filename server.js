const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html if no specific file is requested
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Construct file path
    const filePath = path.join(__dirname, pathname);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    
    // Set content type based on file extension
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Not Found</title>
                    <style>
                        body { 
                            font-family: 'Space Grotesk', sans-serif; 
                            background: #0A0F0A; 
                            color: #BFFF00; 
                            text-align: center; 
                            padding: 50px; 
                        }
                        h1 { font-size: 4rem; margin-bottom: 1rem; }
                        p { font-size: 1.2rem; }
                        a { color: #BFFF00; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>404</h1>
                    <p>File not found: ${pathname}</p>
                    <p><a href="/">← Back to Homepage</a></p>
                </body>
                </html>
            `);
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>500 - Server Error</title>
                        <style>
                            body { 
                                font-family: 'Space Grotesk', sans-serif; 
                                background: #0A0F0A; 
                                color: #BFFF00; 
                                text-align: center; 
                                padding: 50px; 
                            }
                            h1 { font-size: 4rem; margin-bottom: 1rem; }
                            p { font-size: 1.2rem; }
                            a { color: #BFFF00; text-decoration: none; }
                            a:hover { text-decoration: underline; }
                        </style>
                    </head>
                    <body>
                        <h1>500</h1>
                        <p>Server Error: Could not read file</p>
                        <p><a href="/">← Back to Homepage</a></p>
                    </body>
                    </html>
                `);
                return;
            }
            
            // Set headers and send file
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(data);
        });
    });
});

// Start the server
server.listen(port, () => {
    console.log(`🚀 INFACES Website Server running at:`);
    console.log(`📱 Local:    http://localhost:${port}`);
    console.log(`🌐 Network:  http://localhost:${port}`);
    console.log(`\n💡 Tips:`);
    console.log(`   • Press Ctrl+C to stop the server`);
    console.log(`   • Refresh browser to see changes`);
    console.log(`   • Check console for any errors`);
    console.log(`\n🎨 Features available:`);
    console.log(`   • GSAP Animations`);
    console.log(`   • Scroll Triggered Effects`);
    console.log(`   • Interactive Story Modals`);
    console.log(`   • Custom Cursor`);
    console.log(`   • Geometric Background`);
    console.log(`\n✨ Enjoy exploring your INFACES website!`);
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use.`);
        console.log(`💡 Try using a different port or close other applications using port ${port}`);
    } else {
        console.error('❌ Server error:', err);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log('\n\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed successfully');
        process.exit(0);
    });
});
