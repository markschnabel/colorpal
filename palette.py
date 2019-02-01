from sklearn.cluster import MiniBatchKMeans
import numpy as np
import cv2

def generate_palette(image_path):
    # Attempt to load in the image and modify it
    try:
        image = cv2.imread(image_path)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    except:
        return {"error": "image could not be read"}

    # Convert the image to a feature vector 
    image = image.reshape((image.shape[0] * image.shape[1], 3))

    # Perform K-Means clustering on the image and retrieve top 5 most prominant
    mini_kmeans = MiniBatchKMeans(n_clusters=5).fit(image)
    colors = mini_kmeans.cluster_centers_

    # Round the colors to integers
    colors = np.round(colors).astype('int')

    # Group results into a list of dicts & return
    color_palette = []
    for color in colors:
        color_palette.append({ "value": color.tolist() })

    return color_palette
