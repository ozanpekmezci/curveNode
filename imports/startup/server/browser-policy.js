import { BrowserPolicy } from 'meteor/browser-policy-common';

BrowserPolicy.content.allowOriginForAll('s3.eu-central-1.amazonaws.com');
BrowserPolicy.content.allowOriginForAll('s3.ca-central-1.amazonaws.com');
BrowserPolicy.content.allowImageOrigin("blob:");
