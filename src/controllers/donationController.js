const Donation = require('../models/donationModel');

const createDonation = async (req, res) => {
  try {
    const { type, details } = req.body;
    let newRecord;

    switch (type) {
      case 'donation':
        newRecord = new Donation({
          type: 'donation',
          details: {
            name: details.name,
            email: details.email,
            phone: details.phone,
            amount: details.amount,
          },
          date: new Date(),
        });
        break;
      case 'volunteer':
        newRecord = new Donation({
          type: 'volunteer',
          details: {
            name: details.name,
            email: details.email,
            phone: details.phone,
            availability: details.availability,
            volunteerType: details.volunteerType,
          },
          date: new Date(),
        });
        break;
      case 'visit':
        newRecord = new Donation({
          type: 'visit',
          details: {
            name: details.name,
            email: details.email,
            phone: details.phone,
            date: details.date,
          },
          date: new Date(),
        });
        break;
      default:
        return res.status(400).json({ message: 'Invalid request type' });
    }

    await newRecord.save();

    res.status(201).json({ message: 'Request submitted successfully', request: newRecord });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error getting donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getDonationsByType = async (req, res) => {
  try {
    const { type } = req.query;
    let filter = {};

    if (type) {
      filter.type = type;
    }

    const donations = await Donation.find(filter);
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error getting donations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDonation = await Donation.findByIdAndDelete(id);

    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully', deletedDonation });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateDonation = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivered } = req.body;

    const updatedDonation = await Donation.findByIdAndUpdate(
      id,
      { delivered },
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation updated successfully', updatedDonation });
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { createDonation,getAllDonations,deleteDonation,getDonationsByType,getDonationById,updateDonation};
