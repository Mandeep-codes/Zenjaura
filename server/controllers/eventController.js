import Event from '../models/Event.js';

export const getEvents = async (req, res) => {
  try {
    const { search = '', type = 'all' } = req.query;
    const filter = {};

    if (type !== 'all') filter.type = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

export const registerEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.registered >= event.capacity)
      return res.status(400).json({ message: 'Event is full' });

    event.registered += 1;
    await event.save();
    res.json({ message: 'Registered successfully', event });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};
