Exit Intent detection library.

## Usage

```js
import ExitIntent from '@traum-ferienwohnungen/exit-intent'

// Initialise
const exitIntent = new ExitIntent({
  threshold: 50,
  maxDisplays: 2,
  eventThrottle: 100,
  onExitIntent: () => {
    console.log('exit-intent triggered')
  }    
});

// Destroy
exitIntent.removeEvents();
```

### Options

`threshold` (default 20)  
maximum distance in pixels from the top of the page to trigger.

`maxDisplays` (default 1)  
maximum number of times to trigger.

`eventThrottle` (default 200)  
event throttle in milliseconds.

`onExitIntent` (default no-op function)  
function to call when an exit intent has been detected.

### License

originally based on https://github.com/danhayden/exit-intent
