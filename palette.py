from sklearn.cluster import MiniBatchKMeans
import numpy as np
import cv2
import requests

COLORMIND_API = 'http://colormind.io/api/'

def clamp(x):
  return max(0, min(x, 255))

def rgb_to_hex(rgb_arr):
    hex = "#{0:02x}{1:02x}{2:02x}".format(
        clamp(rgb_arr[0]),
        clamp(rgb_arr[1]),
        clamp(rgb_arr[2])
    )
    return hex.upper()

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
    """Function to perform K-Means clustering on an image to determine natural
    clusters in the color data.
    """
    mini_kmeans = MiniBatchKMeans(n_clusters=5).fit(image)
    rgb_values = mini_kmeans.cluster_centers_
    labels = mini_kmeans.labels_

    return rgb_values, mini_kmeans.labels_

def extract_palette(image):
    """Function to extract a color palette from a given image"""

    # Get natural color clusters
    (rgb_values, labels) = cluster(image)

    # Round the returned RGB values to integers as these are much more useful in
    # terms of building palettes
    rgb_values = np.round(rgb_values).astype('int').tolist()

    # Get the number of clusters, the KMeans algorithm is run specifying 5 but
    # it may be less depending on the image
    num_labels = np.arange(0, len(np.unique(labels)) + 1)

    # Group results into a list of dicts & return
    base_color_palette = []
    palette_as_string = ''

    i = len(np.unique(labels))

    for rgb in rgb_values:
        # Build the palette as a string. Used for calling the colormind api.
        palette_as_string +=  '[' + ','.join(map(str, rgb)) + ']' + (',' if i != 1 else '')

        base_color_palette.append({
            "hex": rgb_to_hex(rgb),
            "rgb": rgb
        })
        i -= 1

    return (base_color_palette, palette_as_string)

def fetch_enhanced_palette(palette_as_string):
    """This method uses the natural palette obtained from quantizing the uploaded
    photo to call the colormind.io API to retrieve a color palette that has been
    selected by a ML algorithm based on the colors we provide it.
    """
    try:
        # Try to access the API, if successful return the result
        data = '{"input":[' + palette_as_string + '],"model":"default"}'
        response_json = requests.post(COLORMIND_API, data.encode()).json()['result']
        mapped_response = map(lambda rgb: {"hex": rgb_to_hex(rgb), "rgb": rgb}, response_json)
        return list(mapped_response)
    except:
        # Else return error message
        return {"error": "Something went wrong while accessing the API."}

def generate_palettes(image):
    """Function which calls extract_palette to extract the color palette of a
    given image and then uses that data to call a machine learning API to get an
    enhanced version of that palette, as palettes stripped directly from photos
    may not always be the best.
    """
    (base_color_palette, palette_as_string) = extract_palette(image)

    enhanced_color_palette = fetch_enhanced_palette(palette_as_string)

    palettes = {
        "base_color_palette": base_color_palette,
        "enhanced_color_palette": enhanced_color_palette
    }

    return palettes
