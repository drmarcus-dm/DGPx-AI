async function generateLogo() {
    const promptInput = document.getElementById('prompt').value;
    const status = document.getElementById('status');
    const logoImg = document.getElementById('logo');
    
    if (!promptInput) {
        status.textContent = 'Please enter a description.';
        return;
    }
    
    status.textContent = 'Generating logo...';
    logoImg.src = ''; // Clear previous image
    
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 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' // Replace with your actual API key
            },
            body: JSON.stringify({
                model: 'dall-e-3', // Or 'dall-e-2' for cheaper/faster
                prompt: `Create a professional logo based on: ${promptInput}`,
                n: 1, // Number of images (1 for simplicity)
                size: '1024x1024' // Square for logos
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.data && data.data[0].url) {
            logoImg.src = data.data[0].url;
            status.textContent = 'Logo generated!';
        } else {
            status.textContent = 'Error: ' + (data.error?.message || 'Unknown error');
        }
    } catch (error) {
        status.textContent = 'Error: ' + error.message;
    }
}
