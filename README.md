# ColorPal (API)

**Note: this app is functioning but still in development**

The back APIfor my web app ColorPal which you can find live on the web here:<br /> [https://colorpal.netlify.com](https://colorpal.netlify.com).

If you're looking for the repository for the client side application you can find that here:<br />
[https://github.com/markschnabel/colorpal-client](https://github.com/markschnabel/colorpal-client)


## Getting started

If you would like to run this app locally you can do so by following the following steps. 

#### Prerequisites
These steps assume that you have the following software installed on your computer:
```
Python3.7
```
Run the following commands from a new terminal or CMD window in the directory you want to create the project in:
```
git clone https://github.com/markschnabel/colorpal-api
cd colorpal-api
pip install -r requirements.txt
python app.py
```
The API should now be running on port 5000 of your computer. You can access it by calling localhost:5000/api/[desired-endpoint]

*NOTE* if you experience errors you may need to add the following lines of code to the very end of the [app.py](https://github.com/markschnabel/colorpal-api/blob/master/app.py) file:
```
if __name__ == '__main__':
    app.run(debug=True)
```
This simply tells Python that if the module is called then run the code in the if block. The code in the if block will simply run the API in development mode on your local machine.

### Running the client-side application

#### Prerequisites
These steps assume you have the following programs installed on your computer:
```
Node.js v10.10.0
npm v6.4.1
```

Run the following commands in the directory you want to create the project in:
```
git clone https://github.com/markschnabel/colorpal-client
cd colorpal-client
npm install
npm start
```
The program should now be running at port 3000 on your computer! You can access it by navigating to localhost:3000 in your browser.

### Accessing the server
If you want to access the API server you're going to have to clone the API repository. You can do so by following the following steps.

***Feel free to contact me with any issues***

## How it works

![ColorPal Home Page](https://user-images.githubusercontent.com/36283037/54255934-724e6d80-4530-11e9-9528-4326f8919d4f.png)
Upon accessing the site users are taken to the home page displayed above above. Here they can make the choice of uploading an image or submitting a direct link to an image. The app will then take whatever it is they input it, validate it and if there are no errors send it to the API. 

The API will then re-validate the image as it is important to provide both client side & server side validation. Also if the user passed a URL the API will then fetch the image associated with that URL. If all validation succeeds the image will be passed directly into OpenCV for processing.

A bit of pre-processing is done of the image such as converting it from BGR (OpenCV's default color space) to RGB, resizing the image for faster processing, etc. Once this is complete the sklearn package is used to perform **K-Means clustering** on the image. K-Means is the key algorithm of the application.

K-Means clustering is an unsupervised learning technique which is used to categorize a set of data points into "k" distinct groups. In this case the data points come from the numpy array that represents the image.

* **The steps of K-Means algorithm are as follows:**
    * First select "k" random points, not necessarily from the data set
    * Assign each data point to it's closest cluster
    * Compute the centroid of each cluster
    * Reassign the data points to the new closest cluster. 
    * Repeat step 3 until reassignment no longer takes place. Once reassignment no longer occurs, you'll know you've properly clustered your data.

In the case of images, we are treating each pixel as a data point. We then use the final cluster centroids to represent the dominant colors in the image. 

After the colors have been obtained, they are compiled into a format that the colormind.io API can process, and a call is made for the machine learning enhanced palette. Once both color palettes have been generated they are sent back to the client in JSON format. The JSON data is then used to generate React components which represent the respected color palettes.

An example of the end result can be seen below:
<br /><br />
![ColorPal Results Page](https://user-images.githubusercontent.com/36283037/54255948-7aa6a880-4530-11e9-85bb-727888d94c31.png)


If you would like to find out more about how the API works make sure to check out the API repository here: [https://github.com/markschnabel/colorpal-api](https://github.com/markschnabel/colorpal-api)


## Coming Soon

As stated above the app is currently still in development. There are numerous features I would like to add to the app. This list is to serve as a personal reminder and way to commit myself to completing them. If you would like to contribute to the project feel free to contact me!

### Mobile Support
Currently I am working on making the application responsive for mobile devices. The application is less than a month old and I am a full time student so I have not had the time to add this feature yet.

### Replace Colormind API Call with call to custom GAN
I'd like to replace the colormind.io API call with a custom GAN for a number of reasons. For one I would just prefer the application to be totally self-reliant. This would protect it from any changes to the colormind API. 

Also the colormind.io API only allows an input of up to 5 colors, and only outputs 5 colors. While this is a good number for a color palette I am aware that there are techniques for determining the optimal number of clusters with K-Means and I would really like to implement that, in order to retrieve the "optimal" color palette of the image, and a ML palette to go with it. Instead of being restricted to using 5 colors.

### Extend the application related to color and images
I'd also like to extend the app to include other services related to color and images such as performing color transfer between images, colorizing black and white photos, and any other related application that could be useful or interesting to someone.

## Authors
* **Mark Schnabel** - *Sole contributor* 
    * GitHub - [markschnabel](https://github.com/markschnabel)
    * Linked In - [mark-j-schnabel](https://github.com/markschnabel)
    * [mark.schnabel@markschnabel.com](mailto:mark.schnabel@markschnabel.com)

## License
 
The MIT License (MIT)

Copyright (c) 2019 Mark Schnabel <mark.schnabel@markschnabel.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
