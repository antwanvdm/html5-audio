window.addEventListener('load', init);
var context, bufferLoader, sources = [], filterValue = 'lowpass', frequencyValue = 2500;

/**
 * Start the magic!
 */
function init()
{
    loadSounds();
    document.getElementById('sounds').addEventListener('click', playSoundClickHandler);
    document.getElementById('play-all').addEventListener('click', playAllClickHandler);
    document.getElementById('filter').addEventListener('change', filterChangeHandler);
    document.getElementById('frequency').addEventListener('keyup', frequencyChangeHandler);
}

/**
 * Load all the sound assets
 */
function loadSounds()
{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();

    bufferLoader = new BufferLoader(
        context,
        audioSources.map(function (source)
        {
            return source.file;
        }),
        loadSoundsCallback
    );

    bufferLoader.load();
}

/**
 * Finished loading all the audio
 *
 * @param {Array} bufferList
 */
function loadSoundsCallback(bufferList)
{
    sources = bufferList;
    document.getElementById('preloader').classList.add("loaded");
}

/**
 * Play a specific sound
 *
 * @param e
 */
function playSoundClickHandler(e)
{
    e.preventDefault();
    if (typeof e.target.dataset['index'] === "undefined") {
        return;
    }

    var index = e.target.dataset['index'];
    playSound(index, false);
}

/**
 * Play all sounds
 *
 * @param e
 */
function playAllClickHandler(e)
{
    e.preventDefault();
    playSound(0, true);
}

/**
 * Play a specific sound
 *
 * @param {int}     index
 * @param {Boolean} playAll
 */
function playSound(index, playAll)
{
    if (typeof sources[index] === "undefined") {
        return;
    }

    var source = context.createBufferSource();
    var filter = context.createBiquadFilter();

    source.connect(filter);
    filter.connect(context.destination);
    source.buffer = sources[index];

    filter.type = filterValue; // Low-pass filter. See BiquadFilterNode docs
    filter.frequency.value = frequencyValue; // Set cutoff to 440 HZ

    source.start(0);

    if (playAll) {
        source.onended = playSound.bind(this, index + 1);
    }
}

/**
 * Change filter global value
 */
function filterChangeHandler()
{
    filterValue = document.getElementById('filter').value;
}

/**
 * Change frequency global value
 */
function frequencyChangeHandler()
{
    frequencyValue = document.getElementById('frequency').value;
}
