// @flow

export type SpaceType = {
  id: number,
  user: {
    id: number,
    firebaseUid: string,
    imageUrl: string,
    name: string,
    profile: string,
  },
  addressPref: string,
  addressCity: string,
  addressTown: string,
  title: string,
  images: Array<{
    imageUrl: string,
  }>,
  introduction: string,
  type: number,
  isFurniture: boolean,
  about: string,
  receiptAbout: string,
  priceFull: number,
  priceHalf: number,
  priceQuarter: number,
  location: {
    lat: number,
    lng: number,
  },
  status: string,
};
