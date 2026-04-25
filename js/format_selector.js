document.addEventListener('DOMContentLoaded', function() {
    // Get the format from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const format = urlParams.get('format');

    if (format) {
        // Convert A0plus to A0_plus if needed
        const formatValue = format === 'A0plus' ? 'A0_plus' : format;
        // Find and check the corresponding checkbox
        const checkbox = document.querySelector(`input[type="checkbox"][name="format"][value="${formatValue}"]`);
        if (checkbox) {
            checkbox.checked = true;
            // Trigger HTMX request to update the filtered content
            checkbox.dispatchEvent(new Event('change'));
        }
    }
});