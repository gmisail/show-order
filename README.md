# show-order

Simple command line utility for renaming television shows. Occasionally, the order of episodes in a show's DVD / Blu-ray will differ from that of the original run,
which is most likely based on the airing date. This utility uses data from `epguides.com` to help rename files so that they match the airing order.

## Usage
`npm start <episode path> <series csv>`

Once you run this command, you will be asked to type in the name of the episode for each file. The name does not need to match the official name exactly; fuzzy
searching is used to find the corresponding episode. For instance, if the name of the episode is `The Pez Dispenser` you only need to type in `pez dispenser`. 
Once a file is "mapped" to an episode name, the episode is looked up within the series data file and the file is properly named.

## Example

`npm start ./episodes seinfeld.csv`

```
[show-order] loading episodes from ./episodes...
[show-order] loading series from seinfeld.csv...
[show-order] what is the episode name for a.mp4? the note
[show-order] rename a.mp4 -> S03E01 - The Note.mp4
[show-order] what is the episode name for b.mp4? the truth
[show-order] rename b.mp4 -> S03E02 - The Truth.mp4
[show-order] what is the episode name for c.mp4? the dog
[show-order] rename c.mp4 -> S03E04 - The Dog.mp4
[show-order] done.
```
In this example, files `a, b, c` represent the first three episodes of the `Seinfeld` Season 3 box set. Note how `c`, despite being the third episode of the
box set, is renamed as `S03E04 - The Dog.mp4`; it was renamed to match the order of the original airing. 
