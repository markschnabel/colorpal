from sklearn.cluster import MiniBatchKMeans
import numpy as np
import cv2
import requests

MAX_CLUSTERS = 5

class PaletteExtractor():
    def extract(self, image):
        processed_image = self.__preprocess_image(image)
        rgb_clusters = self.__generate_color_clusters(processed_image)

        palette = self.__format_palette(rgb_clusters)

        return palette

    def __preprocess_image(self, image):
        # Reads binary image data into numpy array
        arr = np.asarray(bytearray(image.read()), dtype=np.uint8)
        image = cv2.imdecode(arr, -1)

        # Convert from OpenCV's default of BGR to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Cut image size to 1/4 to decrease processing time. Has a very minimal effect
        # on the end result but provides a significant increase in speed, especially
        # for high resolution images
        image = cv2.resize(
            image,
            dsize=(int(image.shape[1] / 6), int(image.shape[0] / 6)),
            interpolation=cv2.INTER_CUBIC
        )

        # Convert the image to a feature vector
        image = image.reshape((image.shape[0] * image.shape[1], 3))

        return image

    def __generate_color_clusters(self, image):
        mini_kmeans = MiniBatchKMeans(n_clusters=MAX_CLUSTERS).fit(image)
        rgb_clusters = mini_kmeans.cluster_centers_

        return rgb_clusters

    def __format_palette(self, rgb_clusters):
        return np.round(rgb_clusters).astype('int').tolist()
