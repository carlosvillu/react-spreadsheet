react-spreadsheet
=================

Spreadsheet as a reactJS component.

### Install

Dependencies: 

* nodeJS 0.10
* npm 1.4
* grunt 0.4

#### How to install

        $ git clone https://github.com/carlosvillu/react-spreadsheet
        $ cd react-spreadsheet
        $ npm install
        $ grunt dev

Open your browser in http://localhost:3000

### Description

The goal of this project is to build an online spreadsheet. It is a 40x40 grid with editable cells. Cells adapt to the data entered by the user. 

When clicking a cell, the background of the cell turns blue, indicating it has been selected. Double click turns the background orange, indicating it can be edited.

Cell editing allows the user to enter numeric values or strings, as well as formulas. Formulas must have the following format: =(row number, column number) {op} (row number, column number)...

    =A2+B8 this will add up the contents of the two respective cells

Editing ends when clicking any different cell. For formulas, the grid shows "Formula result". 

#### Saving a file

The app saves files in csv format (comma-separated spreadsheet). To save a file click on the download icon (leftmost icon on the toolbar) and an alert will ask you to specify the name of the file. The default name was set as `spreadsheet.csv`.

Formulas, and not results, are saved in the csv file.

#### Loading

To load an existing csv file, simply drag a file onto the grid. The grid will show the exact number of rows and columns with the original data.

### Architecture

The development is web-component oriented. Thus, the spreadhsheet is a single component that can be used in the following way, `<Spreadsheet spreadsheetStore={spreadsheetStore} />`. On the basis of this, it is very simple to create a multi-tab app with several spreadsheets, each with its own store. 

I used ReactJS framework for this design, following Flux's development philosophy. 

The main actors are 
    
* *Store*: saves the state of the full spreadsheet at any given point. If changes are made in the store, it emits a chain event to update the view. 
* *View*: consists of n row views, which, in turn, consist in m cell views. 
* *Entity*: there is a single basic entity: the cell. It contains its data and state and knows what to show, depending on its state (editing or non-editing).
* *Dispatcher*: directs the information flow from the view to the store, so that the view never communicates directly with the store. This allows one to keep separate view events from data state-changes.

### To do

Version 1.1.2 

* Include functionality for adding new rows and columns.


