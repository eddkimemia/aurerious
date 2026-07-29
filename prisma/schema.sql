-- Aureus Network MySQL Schema
-- Generated from Prisma

CREATE DATABASE IF NOT EXISTS aureus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE aureus;

CREATE TABLE `commission` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `referralId` varchar(191) DEFAULT NULL,
  `amount` double NOT NULL,
  `type` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `description` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Commission_userId_fkey` (`userId`),
  KEY `Commission_referralId_fkey` (`referralId`),
  CONSTRAINT `Commission_referralId_fkey` FOREIGN KEY (`referralId`) REFERENCES `referral` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Commission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `mpesatransaction` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `phone` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `reference` varchar(191) NOT NULL,
  `resultCode` varchar(191) DEFAULT NULL,
  `resultDesc` varchar(191) DEFAULT NULL,
  `merchantRequestId` varchar(191) DEFAULT NULL,
  `checkoutRequestId` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `type` varchar(191) NOT NULL,
  `metadata` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `MpesaTransaction_reference_key` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `payout` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `method` varchar(191) NOT NULL DEFAULT 'mpesa',
  `phone` varchar(191) NOT NULL,
  `reference` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `approvedBy` varchar(191) DEFAULT NULL,
  `approvedAt` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Payout_userId_fkey` (`userId`),
  CONSTRAINT `Payout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `payoutmethod` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'mpesa',
  `phone` varchar(191) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `PayoutMethod_userId_fkey` (`userId`),
  CONSTRAINT `PayoutMethod_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `referral` (
  `id` varchar(191) NOT NULL,
  `referrerId` varchar(191) NOT NULL,
  `refereeId` varchar(191) NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `level` int(11) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Referral_refereeId_key` (`refereeId`),
  KEY `Referral_referrerId_fkey` (`referrerId`),
  CONSTRAINT `Referral_refereeId_fkey` FOREIGN KEY (`refereeId`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Referral_referrerId_fkey` FOREIGN KEY (`referrerId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `setting` (
  `id` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Setting_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `transaction` (
  `id` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `amount` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `reference` varchar(191) DEFAULT NULL,
  `description` varchar(191) DEFAULT NULL,
  `metadata` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Transaction_userId_fkey` (`userId`),
  CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'member',
  `referralCode` varchar(191) NOT NULL,
  `referredBy` varchar(191) DEFAULT NULL,
  `mpesaNumber` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'active',
  `emailVerified` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_phone_key` (`phone`),
  UNIQUE KEY `User_referralCode_key` (`referralCode`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Foreign key relationships are defined inline in CREATE TABLE statements above.
