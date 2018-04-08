// @flow

export type SpaceType = {
  Host: {
    ID: number,
    FirebaseUid: string,
    ImageUrl: string,
    Name: string,
    Profile: string,
  },
  AddressPref: string,
  AddressCity: string,
  AddressTown: string,
  Title: string,
  Images: Array<{
    ImageUrl: string,
  }>,
  Introduction: string,
  Type: number,
  IsFurniture: boolean,
  About: string,
  ReceiptAbout: string,
  PriceFull: number,
  PriceHalf: number,
  PriceQuarter: number,
  location: {
    lat: number,
    lng: number,
  },
};
