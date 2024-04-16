-- CreateTable
CREATE TABLE `ResidentialPowerOutage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `NoOfFloors` VARCHAR(191) NOT NULL,
    `SqFt` VARCHAR(191) NOT NULL,
    `noOfStories` VARCHAR(191) NOT NULL,
    `elevator` VARCHAR(191) NOT NULL,
    `requireHardHad` VARCHAR(191) NOT NULL,
    `describeSituation` VARCHAR(191) NOT NULL,
    `noOfItemsNeededToPower` VARCHAR(191) NOT NULL,
    `noOfLights` VARCHAR(191) NOT NULL,
    `TTLWatts` VARCHAR(191) NOT NULL,
    `noOfHoursPowerIsNeeded` VARCHAR(191) NOT NULL,
    `listItemsNeededToPower` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommercialOrFleetServices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `numberOfCars` VARCHAR(191) NOT NULL,
    `intervals` VARCHAR(191) NOT NULL,
    `averageChargeLevel` VARCHAR(191) NOT NULL,
    `typeOfVehicle` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConstructionSite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `NoOfFloors` VARCHAR(191) NOT NULL,
    `SqFt` VARCHAR(191) NOT NULL,
    `noOfStories` VARCHAR(191) NOT NULL,
    `elevator` VARCHAR(191) NOT NULL,
    `requireHardHad` VARCHAR(191) NOT NULL,
    `describeSituation` VARCHAR(191) NOT NULL,
    `noOfItemsNeededToPower` VARCHAR(191) NOT NULL,
    `noOfLights` VARCHAR(191) NOT NULL,
    `TTLWatts` VARCHAR(191) NOT NULL,
    `noOfHoursPowerIsNeeded` VARCHAR(191) NOT NULL,
    `listItemsNeededToPower` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campsite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `NoOfFloors` VARCHAR(191) NOT NULL,
    `SqFt` VARCHAR(191) NOT NULL,
    `noOfStories` VARCHAR(191) NOT NULL,
    `elevator` VARCHAR(191) NOT NULL,
    `requireHardHad` VARCHAR(191) NOT NULL,
    `describeSituation` VARCHAR(191) NOT NULL,
    `noOfItemsNeededToPower` VARCHAR(191) NOT NULL,
    `noOfLights` VARCHAR(191) NOT NULL,
    `TTLWatts` VARCHAR(191) NOT NULL,
    `noOfHoursPowerIsNeeded` VARCHAR(191) NOT NULL,
    `listItemsNeededToPower` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
