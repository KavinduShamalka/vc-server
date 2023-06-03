# Polygon ID VC Verifier Server

## Local server setup

1. ⭐ Star this repo so you have it for future reference, then clone it and install dependencies

```bash
git clone https://github.com/oceans404/vc-verifier
cd vc-verifier
npm i
```

2. Create a .env file by copying my sample

In your .env file,

```bash
cp .env.sample .env;
```

- Update the `RPC_URL_MUMBAI` to a Polygon Mumbai RPC endpoint. I used [Alchemy's](https://alchemy.com/?r=zU2MTQwNTU5Mzc2M)
- Optionally update the `VERIFIER_DID` to your DID
- Don't change `HOSTED_SERVER_URL` or `CLIENT_URL` yet

3. Run your server on port 3000

```bash
node index.js
```

4. Set up ngrok server forwarding.

If you don't have ngrok already set up, install [ngrok](https://ngrok.com/download) via homebrew or download. [Login](https://dashboard.ngrok.com/login) (I used github login) to create a free account and add your account's config token to the command line.

After ngrok is set up, start a tunnel to port 3000 to expose your server to the internet beyond only being available to your laptop on localhost:3000. This is necessary because the Polygon ID mobile wallet app will use a verfication uri you provide and needs to be able to send the verification result to this exposed public endpoint.

```bash
ngrok http 3000
```

You'll see a forwarding address in the logs

```bash
Forwarding  https://abc-your-forwarding-address-def.ngrok-free.app -> http://localhost:3000
```

5. Update the `HOSTED_SERVER_URL` field your .env file to your forwarding address

```bash
HOSTED_SERVER_URL="https://abc-your-forwarding-address-def.ngrok-free.app"
```

6. Optionally customize your own proof request by changing the credentialSubject in `proofRequest.js`

ex 1: User must have Taylor Swift's [exact](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1) birthday - December 13, 1989

```js
{
  birthday: {
    $eq: 19891213,
  },
};

```

ex 2: User's KYCAgeCredential documentType must be [greater than](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#greater-than-operator-3) 420

```js
{
  documentType: {
    $gt: 420,
  },
};

```

If you don't customize `proofRequest.js`, this server will send a verification request for an KYCAgeCredential proof to the [credentialAtomicQuerySigV2 circuit](https://docs.iden3.io/protocol/main-circuits/#credentialatomicquerysigv2) because the circuitId in `vcHelpers/KYCAgeCredential.js` is set to credentialAtomicQuerySigV2.

This circuit

- Verifies that the prover (your user) is owner of a VC with the KYCAgeCredential type
- Verifies that the identity is the subject of the claim
- Verifies that the claim was signed by the issuer
- Verifies that the claim schema matches the one in the query
- Verifies that the claim is not revoked by the issuer and is not expired
- Verifies that the query posed by the verifier is satisfied by the claim. The check, `$lt: 20230101`, written in [Query Language](https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/) verifies that the `birthday` credentialSubject is less than 20230101 or that the user's birthday is before Jan 1, 2023. In human terms, the user "Must be born before this year."

If all these are satisfied by the verifier, an authResponse with fields for did_doc and scope containing the valid proof will be returned via the handleVerification callback function. 🎉

7. Test the server by hooking it up to a frontend. [WIP]

## Server functionality

The server

- Allows [Socket.io polling](https://socket.io/docs/v3/how-it-works/) to emit session specific events back to connected clients

- Generates a [Query Based Request](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/#query-based-request) in the form of a QR code that the user can scan to prove they own a credential that satisfies certain requirements. It also specifies the callback endpoint for verification

- Reports [Verification](https://0xpolygonid.github.io/tutorials/verifier/verification-library/verification-api-guide/) of the proof sent by the user from their Polygon ID Wallet via callback

## Keys folder

The keys folder holds the authV2, credentialAtomicQueryMTPV2, and credentialAtomicQuerySigV2 public verification keys necessary to verify a zero-knowledge proof. You can optionally verify these keys by following instructions [here](https://github.com/0xPolygonID/phase2ceremony)

Here's the corresponding Iden3 circuit code

- [authV2.circom](https://github.com/iden3/circuits/blob/master/circuits/auth/authV2.circom)
- [credentialAtomicQueryMTPOffChain.circom](https://github.com/iden3/circuits/blob/master/circuits/offchain/credentialAtomicQueryMTPOffChain.circom)
- [credentialAtomicQuerySigOffChain.circom](https://github.com/iden3/circuits/blob/master/circuits/offchain/credentialAtomicQuerySigOffChain.circom)
