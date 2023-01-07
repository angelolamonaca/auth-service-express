const express = require('express');
const {StatusCodes} = require("http-status-codes");
const router = express.Router();
const keycloak = require('../../config/keycloak-config.js').getKeycloak();

/**
 * Get all files
 *
 * Send get request to fileService (GET fileService/v1/file/)
 * FileService will return array of file object
 */
router.get('/', keycloak.protect('realm:user'), (req, res) => {
  const userId = req.kauth.grant.access_token.content.sub;
  console.log(`Request made by userId ${userId}`)


  console.log('Get all files from FileService');

  const file1 = {
    id: "qwer-1234-qwer-1234",
    name: "Pupazzo di neve",
    description: "Il natale non é mai stato cosí bello, il pupazzo di neve renderá le tue feste magiche.",
    url: {
      pes: "www.AWS-Storage.com/file/file.pes",
      sdt: "www.AWS-Storage.com/file/file.sdt",
      vip: "www.AWS-Storage.com/file/file.vip"
    },
    author: "1a49c915-5b97-4295-a085-16e9b8fdf17a"
  }

  const file2 = {
    id: "Pwer-1234-qwer-1234",
    name: "Albero di natale",
    description: "Il natale non é mai stato cosí bello, l'albero di natale renderá le tue feste magiche.",
    url: {
      pes: "www.AWS-Storage.com/file/file.pes",
      sdt: "www.AWS-Storage.com/file/file.sdt",
      vip: "www.AWS-Storage.com/file/file.vip"
    },
    author: "1a49c915-5b97-4295-a085-16e9b8fdf17a"
  }

  res.send([file1, file2]);
});

/**
 * Get a file by id
 *
 * Send get request to fileService with fileId as path param (GET fileService/v1/file/:fileId)
 * FileService will return file object
 */
router.get('/:fileId', keycloak.protect('realm:user'), (req, res) => {
  const userId = req.kauth.grant.access_token.content.sub;
  console.log(`Request made by userId ${userId}`)

  const fileId = req.params.fileId;

  console.log('Get file from FileService by id');

  const file = {
    id: "qwer-1234-qwer-1234",
    name: "Pupazzo di neve",
    description: "Il natale non é mai stato cosí bello, il pupazzo di neve renderá le tue feste magiche.",
    url: {
      pes: "www.AWS-Storage.com/file/file.pes",
      sdt: "www.AWS-Storage.com/file/file.sdt",
      vip: "www.AWS-Storage.com/file/file.vip"
    },
    author: "1a49c915-5b97-4295-a085-16e9b8fdf17a"
  }

  res.send(file);
});

/**
 * Creates a file
 *
 * Send body to fileService (POST fileService/v1/file with file draft object as body)
 * FileService will:
 *  - Convert data to different formats through embroideryService
 *  - Upload files to AWS Storage
 *  - Create file object and save it on FileService DB
 *  - Return file object
 */
router.post('/', keycloak.protect('realm:user'), (req, res) => {
  const userId = req.kauth.grant.access_token.content.sub;
  console.log(`Request made by userId ${userId}`)

  const fileDraft = req.body

  console.log('Send fileDraft to FileService and get file');

  const file = {
    id: 'qwer-1234-qwer-1234',
    name: 'Pupazzo di neve',
    description: 'Il natale non é mai stato cosí bello, il pupazzo di neve renderá le tue feste magiche.',
    url: {
      pes: 'www.AWS-Storage.com/file/file.pes',
      sdt: 'www.AWS-Storage.com/file/file.sdt',
      vip: 'www.AWS-Storage.com/file/file.vip',
    },
    author: userId
  }

  res.status(StatusCodes.CREATED).send(file);
})

/**
 * Updates a file
 *
 * Send body to fileService (PUT fileService/v1/file/:fileId with file object as body)
 * FileService will:
 *  - Convert data to different formats through embroideryService
 *  - Upload files to AWS Storage
 *  - Create file object and update it on FileService DB
 *  - Return file object
 */
router.put('/:fileId', keycloak.protect('realm:user'), (req, res) => {
  const userId = req.kauth.grant.access_token.content.sub;
  console.log(`Request made by userId ${userId}`)

  const file = req.body

  console.log('Send updated file to FileService and get updated file');

  const updatedFile = {
    id: 'qwer-1234-qwer-1234',
    name: 'Pupazzo di neve',
    description: 'Il natale non é mai stato cosí bello, il pupazzo di neve renderá le tue feste magiche.',
    url: {
      pes: 'www.AWS-Storage.com/file/file.pes',
      sdt: 'www.AWS-Storage.com/file/file.sdt',
      vip: 'www.AWS-Storage.com/file/file.vip',
    },
    author: userId
  }

  res.status(StatusCodes.CREATED).send(file);
})

/**
 * Deletes a file
 *
 * Send request to fileService (DELETE fileService/v1/file/:fileId)
 * FileService will:
 *  - Delete files on AWS Storage
 *  - Delete file on FileService DB
 */
router.delete('/:fileId', keycloak.protect('realm:user'), (req, res) => {
  const userId = req.kauth.grant.access_token.content.sub;
  console.log(`Request made by userId ${userId}`)

  console.log('Send delete request to FileService');

  res.sendStatus(StatusCodes.OK);
})

module.exports = router;
