import './app.css'
import React, { useState } from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
const App = () => {
  const [doors, setDoors] = useState([]);
  const [doorHeight, setDoorHeight] = useState('');
  const [doorWidth, setDoorWidth] = useState('');
  const [doorFont, setDoorFont] = useState('');

  const handleHeightChange = (e) => {
    setDoorHeight(e.target.value);
  };

  const handleWidthChange = (e) => {
    setDoorWidth(e.target.value);
  };

  const handleFontChange = (e) => {
    setDoorFont(e.target.value);
  };

  const handleAddDoor = () => {
    if (doorHeight && doorWidth && doorFont) {
      const newDoor = {
        height: doorHeight,
        width: doorWidth,
        font: doorFont,
      };
      setDoors([...doors, newDoor]);
      setDoorHeight('');
      setDoorWidth('');
      setDoorFont('');
    }
  };
  const handleDeleteDoor = (index) => {
    const updatedDoors = [...doors];
    updatedDoors.splice(index, 1);
    setDoors(updatedDoors);
  };
  
// Define the styles object
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 20,
    flexWrap:'wrap',
  },
  doorDetails: {
    marginBottom: 25,
    flexDirection: 'column',
    padding:10,
  },
  heading: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  property: {
    marginBottom: 5,
  },
});
  // Define the PDF document component
  const MyDocument = () => (
    <Document>
      <Page style={styles.page}>
        {doors.map((door, index) => (
          <View key={index} style={styles.doorDetails}>
            <Text style={styles.heading}>Door {index + 1}</Text>
            <Text style={styles.property}>Height: {door.height}</Text>
            <Text style={styles.property}>Width: {door.width}</Text>
            <Text style={styles.property}>Font: {door.font}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );


  return (
    <div className='door'>
      <h1 className='text-4xl font-bold m-6 text-center'>Add Doors</h1>
      <h3 className='text-xl font-bold m-6'>Appartement 1</h3>
      <p>Notice:the size in cm</p>
      <div className='flex justify-between ml-[5%] mr-[5%]'>
<div className='flex flex-col justify-start'>
      
        <label htmlFor="height" className='text-xl text-teal-600 font-bold'>Height:</label>
        <input className='border-2 border-teal-600 rounded-lg'
          type="text"
          id="height"
          value={doorHeight}
          onChange={handleHeightChange}
        
        />
   
    
        <label htmlFor="width" className='text-xl text-teal-600 font-bold'>Width:</label>
        <input className='border-2 border-teal-600 rounded-lg'
          type="text"
          id="width"
          value={doorWidth}
          onChange={handleWidthChange}
        />
    
        <label htmlFor="font" className='text-xl text-teal-600 font-bold'>Font:</label>
        <input className='border-2 border-teal-600 rounded-lg'
          type="text"
          id="font"
          value={doorFont}
          onChange={handleFontChange}/>
      
      <button onClick={handleAddDoor} className='mt-6 bg-teal-300 font-bold rounded-lg'>Add Door</button>
      </div>

<div className=' flex justify-end w-[50%] flex-wrap sticky h-[300px]  overflow-auto bg-gray-200 rounded-xl '>
      {doors.map((door, index) => (
        <div key={index} className='flex flex-wrap m-1 border-3 border-teal-600 '>
          <p className='font-bold'>Door {index + 1}:</p>
          <div className='flex flex-wrp'>
          <p className='p-1'>Height: {door.height}</p>
          <p className='p-1'>Width: {door.width}</p>
          <p className='p-1'>Font: {door.font}</p>
          </div>
          <button onClick={() => handleDeleteDoor(index)} className=' bg-teal-300 font-bold rounded-lg p-1 h-10'>Delete</button>
        </div>
       
      ))} 
      </div>
      
        {/* Download PDF button */}
        <PDFDownloadLink document={<MyDocument />} fileName="door_details.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Generating PDF...' : 'Download PDF'
        }
      </PDFDownloadLink>
      </div>
    </div>
  );
};

export default App;
