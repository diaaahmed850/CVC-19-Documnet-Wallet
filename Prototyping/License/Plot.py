from matplotlib import pyplot as plt
import numpy as np

def plot_figures(figures, nrows, ncols,imSize,fSize):
    """Plot a dictionary of figures.

    Parameters

    ----------
    figures : <title, figure> dictionary
    ncols : number of columns of subplots wanted in the display
    nrows : number of rows of subplots wanted in the figure
    imSize : size of image in plot
    fSize : size of title's font
    """

    fig, axeslist = plt.subplots(ncols=ncols, nrows=nrows, figsize=(imSize, imSize))
    for ind,title in zip(range(len(figures)), figures):
        axeslist.ravel()[ind].imshow(figures[title],cmap="gray")
        axeslist.ravel()[ind].set_title(title,fontsize=fSize)
        axeslist.ravel()[ind].set_axis_off()
    #plt.tight_layout() # optional
    
def plot_gray(image,title,fSize):

    plt.imshow(image, cmap="gray")
    plt.title(title,fontsize=fSize)
    plt.axis('off')
    plt.show()
