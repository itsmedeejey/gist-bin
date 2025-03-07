document.getElementById('pasteButton').addEventListener('click', async () => {
    const content = document.getElementById('content').value.trim();
    const resultDiv = document.getElementById('result');
    const qrDiv = document.getElementById('qr-result');
    const TOKEN = '0d912eb44d9207e7e3d273971ebe7b72b739c15d4c6d27a13e3d1773f307e4af0efc18993b61178cad7308176577c7d2450b07e5baa34acf8b120d90cff96542';
    if (content === "") {
      resultDiv.textContent = "Please enter some text or code.";
      return;
    }
  
    try {
      const response = await fetch('https://hastebin.com/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: content
      });
  
      if (!response.ok) {
        throw new Error('Failed to create paste');
      }
  
      const data = await response.json();
      const pasteUrl = `https://hastebin.com/share/${data.key}`;
      resultDiv.innerHTML = `Gist created: <a href="${pasteUrl}" target="_blank">${pasteUrl}</a>`;

      const copyButton = document.getElementById('copylink');
    copyButton.style.display = 'inline';
    copyButton.onclick = () => {
      navigator.clipboard.writeText(pasteUrl).then(() => {
        alert('Paste URL copied to clipboard');
      })
    };

      qrDiv.innerHTML ="";
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(pasteUrl)}`;
      const imgElement = document.createElement('img');
      imgElement.src = qrCodeUrl;
      imgElement.alt = 'QR Code';
      qrDiv.appendChild(imgElement);
  
    } catch (error) {
      resultDiv.textContent = `Error: ${error.message}`;
    }


 
  });
  
  