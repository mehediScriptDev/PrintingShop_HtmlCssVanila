document.addEventListener('DOMContentLoaded', function() {
    // Check if HTMX is available
    if (typeof htmx === 'undefined') {
        console.error('HTMX is required but not loaded. Please ensure HTMX is loaded before range_sliders.js');
        return;
    }

    // Original range slider functionality
    document.querySelectorAll('[class^="range-slider"]').forEach(slider => {
        const [minInput, maxInput] = slider.querySelectorAll('input[type="number"]');
        const [minRange, maxRange] = slider.querySelectorAll('input[type="range"]');
        const [minThumb, maxThumb] = slider.querySelectorAll('.custom-thumb');

        if (!minInput || !maxInput || !minRange || !maxRange || !minThumb || !maxThumb) {
            console.error('Required elements not found for range slider');
            return;
        }

        let isDragging = false;
        let currentThumb = null;
        let sliderRect = slider.getBoundingClientRect();
        let totalWidth = slider.offsetWidth;

        function updateValues() {
            const minVal = parseInt(minRange.value);
            const maxVal = parseInt(maxRange.value);

            minInput.value = minVal;
            maxInput.value = maxVal;

            const range = maxRange.max - minRange.min;
            minThumb.style.left = `${((minVal - minRange.min) / range) * 100}%`;
            maxThumb.style.left = `${((maxVal - minRange.min) / range) * 100}%`;

            // Safe HTMX trigger with checks
            try {
                const form = slider.closest('form');
                if (form && typeof htmx !== 'undefined') {
                    htmx.trigger(form, 'change');
                }
            } catch (error) {
                console.error('Error triggering HTMX event:', error);
            }
        }

        function getValueFromPosition(x) {
            const position = (x - sliderRect.left) / totalWidth;
            return Math.round(position * (maxRange.max - minRange.min) + parseInt(minRange.min));
        }

        function handleMouseDown(e) {
            isDragging = true;
            currentThumb = e.target;
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

function handleMouseMove(e) {
    if (!isDragging) return;

    const x = e.clientX;
    let newValue = getValueFromPosition(x);

    if (currentThumb === minThumb) {
        newValue = Math.min(newValue, parseInt(maxRange.value));
        minRange.value = newValue;
    } else {
        newValue = Math.max(newValue, parseInt(minRange.value));
        maxRange.value = newValue;
    }

    updateValues();

    // Trigger the input event on the range input
    const rangeInput = (currentThumb === minThumb) ? minRange : maxRange;
    htmx.trigger(rangeInput, 'change');
}


        function handleMouseUp() {
            isDragging = false;
            currentThumb = null;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        // Event listeners for thumbs
        minThumb.addEventListener('mousedown', handleMouseDown);
        maxThumb.addEventListener('mousedown', handleMouseDown);

        // Input handlers
        function handleRangeInput(e) {
            if (e.target === minRange) {
                minRange.value = Math.min(parseInt(minRange.value), parseInt(maxRange.value));
            } else {
                maxRange.value = Math.max(parseInt(maxRange.value), parseInt(minRange.value));
            }
            updateValues();
        }

function handleNumberInput(e) {
    // Only update if the value is not empty and is a valid number
    if (e.target.value !== '') {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            if (e.target === minInput) {
                minRange.value = Math.min(value, parseInt(maxRange.value));
            } else {
                maxRange.value = Math.max(value, parseInt(minRange.value));
            }
            updateValues();
        }
    }
}



        // Initialize listeners
        minRange.addEventListener('input', handleRangeInput);
        maxRange.addEventListener('input', handleRangeInput);
        minInput.addEventListener('input', handleNumberInput);
        maxInput.addEventListener('input', handleNumberInput);

        // Initial setup
        try {
            updateValues();
        } catch (error) {
            console.error('Error during initial setup:', error);
        }

        // Resize handler with debouncing
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                sliderRect = slider.getBoundingClientRect();
                totalWidth = slider.offsetWidth;
            }, 250); // Debounce resize events
        });
    });
});
