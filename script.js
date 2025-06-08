document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const usernameInput = document.getElementById('username');
    const commentText = document.getElementById('comment-text');
    const profileUpload = document.getElementById('profile-upload');
    const profilePreview = document.getElementById('profile-preview');
    const previewAvatar = document.getElementById('preview-avatar');
    const previewUsername = document.getElementById('preview-username');
    const previewText = document.getElementById('preview-text');
    const downloadBtn = document.getElementById('download-btn');
    const commentPreview = document.getElementById('comment-preview');
    
    // Store the uploaded image URL
    let uploadedImageUrl = null;
    
    // Update preview when username changes
    usernameInput.addEventListener('input', updatePreview);
    
    // Update preview when comment text changes
    commentText.addEventListener('input', updatePreview);
    
    // Handle profile picture upload
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Create a URL for the uploaded file
            if (uploadedImageUrl) {
                URL.revokeObjectURL(uploadedImageUrl); // Clean up previous URL
            }
            uploadedImageUrl = URL.createObjectURL(file);
            
            // Update preview with the new image
            const img = document.createElement('img');
            img.src = uploadedImageUrl;
            
            // Clear previous content and add the new image
            profilePreview.innerHTML = '';
            profilePreview.appendChild(img);
            
            // Update the preview avatar
            updatePreviewAvatar(img.src);
        }
    });
    
    // Update the preview avatar with the uploaded image
    function updatePreviewAvatar(imageUrl) {
        previewAvatar.innerHTML = '';
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius = '50%';
            img.style.objectFit = 'cover';
            previewAvatar.appendChild(img);
        } else {
            const icon = document.createElement('i');
            icon.className = 'fas fa-user-circle';
            previewAvatar.appendChild(icon);
        }
    }
    
    // Update the preview with current input values
    function updatePreview() {
        previewUsername.textContent = usernameInput.value || '@username';
        previewText.textContent = commentText.value || 'This is a sample TikTok comment! 😊';
    }
    
    // Handle download button click
    downloadBtn.addEventListener('click', function() {
        // Temporarily hide the download button to exclude it from the screenshot
        downloadBtn.style.display = 'none';
        
        // Use html2canvas to capture the comment preview
        html2canvas(commentPreview, {
            scale: 2, // Higher scale for better quality
            backgroundColor: '#ffffff', // White background
            logging: false,
            useCORS: true // For handling external images if any
        }).then(canvas => {
            // Create a temporary link to download the image
            const link = document.createElement('a');
            link.download = 'tiktok-comment.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
            
            // Show the download button again
            downloadBtn.style.display = 'flex';
        }).catch(err => {
            console.error('Error generating image:', err);
            alert('Error generating image. Please try again.');
            downloadBtn.style.display = 'flex';
        });
    });
    
    // Initialize the preview
    updatePreview();
    
    // Clean up object URLs when the page is unloaded
    window.addEventListener('beforeunload', function() {
        if (uploadedImageUrl) {
            URL.revokeObjectURL(uploadedImageUrl);
        }
    });
});
