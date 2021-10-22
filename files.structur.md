src/ApiClient
├── Application
│   ├── ApiClient
│   │   ├── CreateApiClient
│   │   ├── DisableApiClient
│   │   ├── EnableApiClient
│   │   ├── GetApiClient
│   │   ├── ListApiClient
│   │   ├── RemoveApiClient
│   │   └── ChangeApiClientDetails
│   ├── ClientIpAddress
│   │   ├── BlackListClientIpAddress
│   │   ├── CreateClientIpAddress
│   │   ├── ListByApiClientId
│   │   ├── ListClientIpAddresses
│   │   └── WhiteListClientIpAddress
│   └── InternalContactPerson
│       ├── CreateInternalContactPerson
│       ├── GetInternalContactPerson
│       ├── GetByApiClientId
│       ├── ListContacts
│       ├── ReassignApiClient
│       └── Remove
├── Domain
│   └── Model
│       ├── ApiClient
│       ├── ClientIpAddress
│       └── InternalContactPerson
└── Infrastructure
    ├── Delivery
    │   └── Http
    │       └── SymfonyBundle
    │           ├── Controller
    │           │   ├── ApiClientController.php
    │           │   ├── InternalContactController.php
    │           │   └── IpAddressController.php
    │           ├── DependencyInjection
    │           │   ├── Compiler
    │           │   │   ├── EntityManagerPass.php
    │           │   │   └── RouterPass.php
    │           │   ├── Configuration.php
    │           │   ├── MetadataLoader
    │           │   │   ├── Adapter
    │           │   │   │   ├── HateoasSerializerAdapter.php
    │           │   │   │   └── JMSSerializerBuilderAdapter.php
    │           │   │   ├── Exception
    │           │   │   │   ├── AmbiguousNamespacePathException.php
    │           │   │   │   ├── EmptyMetadataDirectoryException.php
    │           │   │   │   ├── FileException.php
    │           │   │   │   ├── MalformedNamespaceException.php
    │           │   │   │   └── MetadataLoadException.php
    │           │   │   ├── FileMetadataLoader.php
    │           │   │   ├── MetadataAware.php
    │           │   │   └── MetadataLoaderInterface.php
    │           │   └── MFBApiClientExtension.php
    │           ├── DTO
    │           │   └── ApiClient
    │           │       └── ChangeInternalContact
    │           │           ├── ChangeInternalContactRequest.php
    │           │           └── ChangeInternalContactResponse.php
    │           ├── MFBApiClientBundle.php
    │           ├── Resources
    │           │   ├── config
    │           │   │   ├── domain_services.yml
    │           │   │   ├── metadata_loader.yml
    │           │   │   ├── routing.yml
    │           │   │   └── services.yml
    │           │   ├── hateoas
    │           │   │   └── ApiClient
    │           │   │       ├── Application
    │           │   │       │   ├── ApiClient
    │           │   │       │   │   ├── CreateApiClient
    │           │   │       │   │   │   └── CreateApiClientResponse.yml
    │           │   │       │   │   └── ListApiClient
    │           │   │       │   │       └── ListApiClientResponse.yml
    │           │   │       │   ├── ClientIpAddress
    │           │   │       │   │   ├── CreateClientIpAddress
    │           │   │       │   │   │   └── CreateClientIpAddressResponse.yml
    │           │   │       │   │   ├── ListByApiClientId
    │           │   │       │   │   │   └── ListByApiClientIdResponse.yml
    │           │   │       │   │   └── ListClientIpAddresses
    │           │   │       │   │       └── ListClientIpAddressesResponse.yml
    │           │   │       │   └── InternalContactPerson
    │           │   │       │       ├── Create
    │           │   │       │       │   └── CreateResponse.yml
    │           │   │       │       └── List
    │           │   │       │           └── ListResponse.yml
    │           │   │       └── Domain
    │           │   │           ├── ApiClient
    │           │   │           │   └── ApiClient.yml
    │           │   │           ├── ClientIpAddress
    │           │   │           │   └── ClientIpAddress.yml
    │           │   │           └── InternalContactPerson
    │           │   │               └── InternalContactPerson.yml
    │           │   └── serializer
    │           │       ├── ApiClient
    │           │       │   ├── Application
    │           │       │   │   ├── ApiClient
    │           │       │   │   │   ├── CreateApiClient
    │           │       │   │   │   │   ├── ContactPersonRequest.yml
    │           │       │   │   │   │   ├── CreateApiClientRequest.yml
    │           │       │   │   │   │   └── CreateApiClientResponse.yml
    │           │       │   │   │   └── GetApiClient
    │           │       │   │   │       └── GetApiClientResponse.yml
    │           │       │   │   ├── ClientIpAddress
    │           │       │   │   │   └── CreateClientIpAddress
    │           │       │   │   │       ├── CreateClientIpAddressRequest.yml
    │           │       │   │   │       └── CreateClientIpAddressResponse.yml
    │           │       │   │   └── InternalContactPerson
    │           │       │   │       ├── Create
    │           │       │   │       │   ├── CreateRequest.yml
    │           │       │   │       │   └── CreateResponse.yml
    │           │       │   │       ├── Get
    │           │       │   │       │   └── GetResponse.yml
    │           │       │   │       ├── List
    │           │       │   │       │   └── ListResponse.yml
    │           │       │   │       └── ReassignApiClient
    │           │       │   │           └── ReassignApiClientRequest.yml
    │           │       │   └── Domain
    │           │       │       ├── ApiClient
    │           │       │       │   ├── ApiClient.yml
    │           │       │       │   └── ContactPerson.yml
    │           │       │       ├── ClientIpAddress
    │           │       │       │   └── ClientIpAddress.yml
    │           │       │       └── InternalContactPerson
    │           │       │           └── InternalContactPerson.yml
    │           │       └── Bundle
    │           │           └── DTO
    │           │               └── ApiClient
    │           │                   └── ChangeInternalContact
    │           │                       └── ChangeInternalContactRequest.yml
    │           └── Service
    │               └── Hateoas
    │                   └── UrlGenerator.php
    └── Persistence
        ├── Doctrine
        │   ├── ApiClient
        │   │   ├── ApiClientRepository.php
        │   │   └── mapping
        │   │       ├── ApiClientId.orm.yml
        │   │       ├── ApiClient.orm.yml
        │   │       ├── CompanyName.orm.yml
        │   │       ├── ContactEmail.orm.yml
        │   │       ├── ContactList.orm.yml
        │   │       ├── ContactName.orm.yml
        │   │       ├── ContactPerson.orm.yml
        │   │       ├── ContactPhone.orm.yml
        │   │       └── ContractReference.orm.yml
        │   ├── ClientIpAddress
        │   │   ├── ClientIpAddressRepository.php
        │   │   └── mapping
        │   │       ├── ClientIpAddressId.orm.yml
        │   │       ├── ClientIpAddress.orm.yml
        │   │       └── IpAddress.orm.yml
        │   └── InternalContactPerson
        │       ├── InternalContactPersonRepository.php
        │       └── mapping
        │           ├── InternalContactPersonId.orm.yml
        │           └── InternalContactPerson.orm.yml
        └── InMemory
            ├── ApiClient
            │   └── ApiClientRepository.php
            ├── ClientIpAddress
            │   └── ClientIpAddressRepository.php
            └── InternalContactPerson
                └── InternalContactPersonRepository.php

94 directories, 145 files