from sklearn.cluster import MiniBatchKMeans
import numpy as np
import cv2

def preprocess(image):
    """Function to preprocess the image so that it is in the correct format to 
    work with for the color extraction process.
    """
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
        dsize=(int(image.shape[1]/6), int(image.shape[0]/6)), 
        interpolation=cv2.INTER_CUBIC
    )

    # Convert the image to a feature vector 
    image = image.reshape((image.shape[0] * image.shape[1], 3))

    return image

def cluster(image):
    # Perform K-Means clustering on the image
    mini_kmeans = MiniBatchKMeans(n_clusters=5).fit(image)
    rgb_values = mini_kmeans.cluster_centers_
    labels = mini_kmeans.labels_

    return rgb_values, mini_kmeans.labels_

def extract_palette(image):
    """Function to extract a color palette from a given image"""

    # Cluster image
    (rgb_values, labels) = cluster(image)

    # Round the rgb_values to integers
    rgb_values = np.round(rgb_values).astype('int').tolist()

    # Group results into a list of dicts & return
    color_palette = []

    for rgb in rgb_values:
        color_palette.append({ "rgb": rgb})

    return color_palette
