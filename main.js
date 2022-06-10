import Fuse from 'fuse.js'
import fs from 'fs';
import neat from 'neat-csv';
import readline from 'readline-sync';

const options = {
    isCaseSensitive: false,
    
    keys: [
      "title"
    ]
};
  
let load_episodes = (directory) => {
    let all_files = fs.readdirSync(directory);

    return all_files.map(file_name => {
        const extension = file_name.split('.').pop();

        return {
            episode_name: undefined,
            file_name,
            extension,
            path: `${directory}/`,
        };
    });
}

let load_series = async (file) => {
    let file_contents = fs.readFileSync(file);
    return neat(file_contents);
}

let rename_episode = async (file, episode) => {
    const season_num = episode.season <= 9 ? `0${episode.season}` : `${episode.season}`;
    const episode_num = episode.episode <= 9 ? `0${episode.episode}` : `${episode.episode}`;
    
    const updated_name = `S${season_num}E${episode_num} - ${episode.title}`;

    console.log(`[show-order] rename ${file.file_name} -> ${updated_name}.${file.extension}`)

    fs.renameSync(`${file.path}${file.file_name}`, `${file.path}${updated_name}.${file.extension}`);
}

let process_episode = (episode) => {
    const episode_name = readline.question(`[show-order] what is the episode name for ${episode.file_name}? `);
    const results = finder.search(episode_name);
    const match = results[0].item;

    rename_episode(episode, series_table.get(match.title));
}

if (process.argv.length != 4) {
    console.log("[show-order] expected: <episodes-path> <series csv>");
    process.exit(1);
}

const episode_path = process.argv[2];
const series_csv_path = process.argv[3];

console.log(`[show-order] loading episodes from ${episode_path}...`);
const episodes = load_episodes(episode_path);

console.log(`[show-order] loading series from ${series_csv_path}...`);
const series = await load_series(series_csv_path);

const episode_names = series.map(episode => episode.title);
const finder = new Fuse(series, options);

let series_table = new Map();
series.forEach(episode => series_table.set(episode.title, episode));
episodes.forEach(process_episode);

console.log("[show-order] done.");