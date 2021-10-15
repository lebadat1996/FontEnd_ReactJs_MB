
function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}

export const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));

function importAllAvatar(r) {
    let imagesA = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
}
export const imagesAvatar = importAllAvatar(require.context('./assets/avatar', false, /\.(png|jpe?g|svg)$/));

