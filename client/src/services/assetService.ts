import { Image, ImageSourcePropType } from 'react-native';

const assets: ImageSourcePropType[] = [
  require('../../assets/icon.png'),
  require('../../assets/splash-icon.png'),
  require('../../assets/android-icon-foreground.png'),
  require('../../assets/circle.png'),
  require('../../assets/cloud.png'),
  require('../../assets/cross.png'),
  require('../../assets/diamond.png'),
  require('../../assets/down.png'),
  require('../../assets/hexagon.png'),
  require('../../assets/hexagon_horizontal.png'),
  require('../../assets/left.png'),
  require('../../assets/octagon.png'),
  require('../../assets/octagram.png'),
  require('../../assets/pentagon.png'),
  require('../../assets/reverse_triangle.png'),
  require('../../assets/right.png'),
  require('../../assets/square.png'),
  require('../../assets/star_five.png'),
  require('../../assets/star_four.png'),
  require('../../assets/triangle.png'),
  require('../../assets/up.png'),
];

export const assetService = {
  async preloadAll(onProgress?: (progress: number) => void) {
    let completed = 0;

    await Promise.all(
      assets.map(async (asset) => {
        const source = Image.resolveAssetSource(asset);

        if (source?.uri) {
          await Image.prefetch(source.uri);
        }

        completed += 1;
        onProgress?.(completed / assets.length);
      }),
    );
  },
};
