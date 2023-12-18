import React, { useState } from 'react';
import axios from 'axios';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    experienceName: '',
    date: '',
    numberOfPersons: 1,
    customerName: '',
  });

  const [ticketData, setTicketData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/generate-ticket', formData);
      setTicketData(response.data);
    } catch (error) {
      console.error('Error generating ticket:', error);
    }
  };

  const handleDownload = () => {
    const byteCharacters = atob(ticketData.image.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/png' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `ticket_${ticketData.bookingId}.png`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Ticket Generator</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="experienceName" className="block text-sm font-medium text-gray-600">
            Experience Name
          </label>
          <input
            type="text"
            id="experienceName"
            name="experienceName"
            value={formData.experienceName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-600">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numberOfPersons" className="block text-sm font-medium text-gray-600">
            Number of Persons
          </label>
          <input
            type="number"
            id="numberOfPersons"
            name="numberOfPersons"
            value={formData.numberOfPersons}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            min="1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-600">
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Generate and Download Ticket
        </button>
      </form>

      {ticketData && (
        <div className="mt-4">
          <p>Booking ID: {ticketData.bookingId}</p>
          <img src={`data:image/png;base64,${ticketData.image}`} alt="Ticket" className="mt-2" />
          <button
            onClick={handleDownload}
            className="block bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 mt-2"
          >
            Download Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
