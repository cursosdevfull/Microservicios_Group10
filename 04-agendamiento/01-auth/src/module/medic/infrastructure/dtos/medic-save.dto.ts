import { Medic } from "../../domain/roots/medic";
import { AddressEntity } from "../persistence/address.entity";
import { DiseaseEntity } from "../persistence/disease.entity";
import { MedicEntity } from "../persistence/medic.entity";

export class MedicSaveDto {
  static fromDomainToData(medic: Medic): MedicEntity {
    const properties: any = medic.properties();
    /*properties.addresses = properties.address?.map((address: any) => {
      const newAddress = new AddressEntity();
      newAddress.id = address.id;
      newAddress.street = address.street;
      newAddress.number = address.number;
      newAddress.complement = address.complement;

      return newAddress;
    });
    //properties.addresses = properties.address;
    properties.diseases = properties.diseases?.map((disease: any) => {
      const newDisease = new DiseaseEntity();
      newDisease.id = disease.id;
      newDisease.name = disease.name;
      return newDisease;
    });
    properties.speciality = properties.specialty
      ? properties.specialty.id
      : null;

    return plainToInstance(MedicEntity, properties);*/

    const entity = new MedicEntity();
    entity.id = properties.id;
    entity.name = properties.name;
    entity.lastname = properties.lastname;
    entity.dni = properties.dni;
    entity.email = properties.email;
    entity.cmp = properties.cmp;
    entity.phone = properties.phone;
    entity.addresses = properties.address?.map((address: any) => {
      const newAddress = new AddressEntity();
      newAddress.id = address.id;
      newAddress.street = address.street;
      newAddress.number = address.number;
      newAddress.complement = address.complement;

      return newAddress;
    });
    entity.age = properties.age;
    entity.createdAt = properties.createdAt;
    entity.updatedAt = properties.updatedAt;
    entity.deletedAt = properties.deletedAt;
    entity.isActive = properties.isActive;
    entity.gender = properties.gender;
    entity.diseases = properties.diseases?.map((disease: any) => {
      const newDisease = new DiseaseEntity();
      newDisease.id = disease.id;
      newDisease.name = disease.name;
      return newDisease;
    });
    entity.nationality = properties.nationality;
    entity.speciality = properties.specialty ? properties.specialty.id : null;
    return entity;
  }
}
