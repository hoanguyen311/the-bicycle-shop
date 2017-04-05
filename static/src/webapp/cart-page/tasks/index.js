import Start from 'start';
import reporter from 'start-pretty-reporter';
// import files from 'start-files';
// import clean from 'start-clean';
// import write from 'start-write';
import webpack from 'start-webpack';
import env from 'start-env';
import path from 'path';
import webpackDevServer from 'start-webpack-dev-server';


const start = Start(reporter());

const root = path.resolve(__dirname, '..');

export function dev() {
    return start(
        env('development', () => {
            const cfg = require(root + '/webpack/development');

            return start(
                webpackDevServer(cfg.default(), {}, { port: cfg.DEFAULT_PORT, hot: true })
            );
        })
    );
}

export function build() {
    return start(
        env('production', () => {
            const cfg = require(root + '/webpack/production');

            return start(
                webpack(cfg.default, cfg.statOptions)
            );
        })
    );
}
