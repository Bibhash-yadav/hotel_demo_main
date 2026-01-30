export type RoomStatus = 'Available' | 'Booked' | 'Cleaning' | 'Maintenance';

export interface Room {
  id: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  price: number;
  status: RoomStatus;
  imageUrl: string;
  features: string[];
}
export interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: 'Confirmed' | 'Pending' | 'Checked Out';
}