
const STEAMAPP_ID = '1966720';
const GAME_ID = 'lethalcompany';


const path = require('path');
const { fs, log, util } = require('vortex-api');

function main(context) {

    context.requireExtension('modtype-bepinex');
    
    context.registerGame({
        id: GAME_ID,
        name: 'Lethal Company',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => '',
        logo: 'gameart.jpg',
        executable: () => 'Lethal Company.exe',
        requiredFiles: [
            'Lethal Company.exe',
        ],
        setup: prepareForModding,
        environment: {
            SteamAPPId: STEAMAPP_ID,
        },
        details: {
            steamAppId: STEAMAPP_ID,
        },
    });

    context.once(() => {

    if (context.api.ext.bepinexAddGame !== undefined) {
        context.api.ext.bepinexAddGame({ gameId: GAME_ID, autoDownloadBepInEx: false });
    }
    })

    return true;
}

function findGame() {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID])
        .then(game => game.gamePath);
}

function prepareForModding(discovery) {
    return fs.ensureDirWritableAsync(path.join(discovery.path, 'BepInEx'));
}

module.exports = {
    default: main,
};
