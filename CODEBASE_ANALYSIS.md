# FlowFinance Frontend - Complete Codebase Analysis

## Project Overview
FlowFinance is a DeFi lending platform built on Base Sepolia testnet. It enables peer-to-peer loans with crypto collateral and fiat currency support.

---

## 1. CONTRACT ADDRESSES (from `.env`)

| Contract | Address | Purpose |
|----------|---------|---------|
| **CONFIGURATION** | `0xEAD13B14D1AACC15523D2A404503307E3DD96762` | Central configuration for loan parameters, fees, and asset management |
| **COLLATERAL ESCROW** | `0x864825977DB369137DC268B5AF7DBB0E2EA4E1AF` | Manages collateral deposits and releases |
| **SUPPLIER REGISTRY** | `0xF9D2D245F698AE927B035F3B528467B518E67ED6` | Tracks fiat suppliers, KYC verification, and reputation |
| **LOAN MARKETPLACE** | `0x05DF8D24BA8DC62727C1635C8C7B4EA789CCD625` | Core marketplace for crypto-backed loans |
| **FIAT LOAN BRIDGE** | `0x9504835A5518F23C7D2AACBEB44942E6809AF16E` | Bridges crypto loans with fiat currency transactions |

---

## 2. CONTRACT ARCHITECTURE & FUNCTIONS

### 2.1 CONFIGURATION CONTRACT
**Role:** System-wide parameters and calculations

#### Key Read Functions:
- `calculateHealthFactor()` - Loan health metric (collateral/debt ratio)
- `calculateCollateralValueInUSD()` - USD valuation of collateral
- `calculateLoanValueInUSD()` - USD valuation of loan amount
- `calculatePlatformFee()` - Fee calculations
- `getTokenPriceInUSD()` - Price oracle integration
- `isAssetSupported()` - Check if token is allowed
- `gracePeriod()` - Default loan grace period
- `minCollateralRatio()` - Minimum collateral requirement
- `maxInterestRate()` - Capped interest rate
- `minLoanDuration()` / `maxLoanDuration()` - Duration constraints
- `platformFeeRate()` - Platform fee percentage
- `liquidationThreshold()` - When loans can be liquidated

#### Key Write Functions:
- `setFeeCollector()` - Update fee recipient
- `setPriceFeed()` - Add/update token price feeds
- `setSupportedAsset()` - Enable/disable tokens
- `setLoanDurationLimits()` - Adjust duration constraints
- `setMinCollateralRatio()` - Update safety ratio
- `setMaxInterestRate()` - Cap interest rates

---

### 2.2 COLLATERAL ESCROW CONTRACT
**Role:** Custody and management of collateral tokens

#### Key Functions:
- `depositCollateral()` - Borrower deposits collateral for a loan
- `getCollateralDetails()` - Retrieve collateral info (token, amount, depositor)
- `hasCollateral()` - Check if loan has collateral
- `releaseCollateral()` - Return collateral on loan repayment
- `releasePartialCollateral()` - Return portion of collateral on partial repayment
- `seizeCollateral()` - Liquidate collateral on default
- `isCryptoLoan()` - Flag for crypto vs fiat loans

#### Events:
- `CollateralDeposited` - When collateral is locked
- `CollateralReleased` - When collateral is returned
- `CollateralSeized` - When collateral is liquidated

---

### 2.3 LOAN MARKETPLACE CONTRACT
**Role:** Core lending/borrowing marketplace for crypto loans

#### Key Read Functions:
- `getLenderOfferDetails()` - Lender's loan offer details
- `getActiveLenderOffers()` - All active lender offers
- `getActiveLenderOffersShuffled()` - Shuffled offers for UI randomization
- `getActiveLoanRequests()` - All borrower requests looking for funding
- `getLoanHealthFactor()` - Current health of a loan
- `calculateRepaymentAmount()` - Total amount to repay with interest
- `canLiquidate()` - Check if loan is liquidatable
- `calculateLiquidationAmounts()` - Debt, collateral, and bonus on liquidation

#### Key Write Functions (Borrower):
- `createLoanRequest()` - Borrower requests funds with collateral
- `cancelLoanRequest()` - Borrower withdraws their request
- `acceptLenderOffer()` - Borrower accepts lender's offer
- `repayLoan()` - Borrower repays principal + interest
- `requestLoanExtension()` - Ask to extend loan duration

#### Key Write Functions (Lender):
- `createLenderOffer()` - Lender offers funds with terms
- `cancelLenderOffer()` - Lender withdraws their offer
- `approveLoanExtension()` - Lender approves duration extension
- `fundLoanRequest()` - Lender funds a specific request
- `liquidateLoan()` - Liquidate defaulted loan, seize collateral
- `partialLiquidation()` - Liquidate portion of collateral

#### Key Data Structures:
```
Loan {
  loanId, requestId, borrower, lender
  collateralAsset, collateralAmount, collateralReleased
  borrowAsset, principalAmount
  interestRate, duration, startTime, dueDate
  amountRepaid, status
  gracePeriodEnd
}

LenderOffer {
  offerId, lender
  lendAsset, lendAmount
  requiredCollateralAsset, minCollateralAmount
  interestRate, duration
  createdAt, expireAt, status
}

LoanRequest {
  requestId, borrower
  collateralToken, collateralAmount
  borrowAsset, borrowAmount
  interestRate, duration
  createdAt, expireAt, status
}
```

---

### 2.4 FIAT LOAN BRIDGE CONTRACT
**Role:** Bridges crypto collateral with fiat loan amounts

#### Key Read Functions:
- `getFiatLoanDetails()` - Fiat loan full details
- `getFiatLenderOfferDetails()` - Fiat offer details
- `getActiveFiatLoanRequests()` - Active borrower requests for fiat
- `getActiveFiatLenderOffers()` - Active lender fiat offers
- `getBorrowerFiatLoans()` - All loans for a borrower
- `getSupplierFiatLoans()` - All loans supplied by a supplier
- `calculateFiatLoanDebt()` - Current debt with interest
- `supportedCurrencies()` - Check if fiat currency supported (USD, EUR, etc.)

#### Key Write Functions:
- `createFiatLoanRequest()` - Borrower requests fiat loan with crypto collateral
- `createFiatLenderOffer()` - Lender/supplier offers fiat with collateral requirement
- `acceptFiatLenderOffer()` - Borrower accepts fiat offer
- `acceptFiatLoanRequest()` - Supplier funds a borrower request
- `confirmFiatTransfer()` - Supplier confirms sending fiat (proof hash)
- `confirmFiatReceipt()` - Borrower confirms receiving fiat
- `confirmFiatRepayment()` - Borrower confirms repaying fiat (proof hash)
- `confirmRepaymentReceived()` - Supplier confirms fiat repayment received
- `disputeFiatLoan()` - Raise dispute if issue occurs
- `resolveDispute()` - Admin resolves dispute
- `liquidateFiatLoan()` - Liquidate collateral on fiat loan default

#### Key Data Structures:
```
FiatLoan {
  loanId, borrower, supplier
  collateralAsset, collateralAmount
  fiatAmount, fiatCurrency (USD, EUR, etc.)
  interestRate, duration
  status (PENDING, ACTIVE, COMPLETED, DISPUTED, LIQUIDATED)
  transferProofHash, repaymentProofHash
  borrowerConfirmed, supplierConfirmed
  fundedAt, dueDate, gracePeriodEnd
}

FiatLenderOffer {
  offerId, supplier
  fiatAmount, fiatCurrency
  requiredCollateralAsset, minCollateralAmount
  interestRate, duration
  expireAt, status
}
```

---

### 2.5 SUPPLIER REGISTRY CONTRACT
**Role:** Manages fiat loan suppliers (verification, reputation, staking)

#### Key Read Functions:
- `getSupplierDetails()` - Full supplier profile
- `getActiveSuppliers()` - All active fiat suppliers
- `getVerifiedSuppliers()` - KYC-verified suppliers
- `getSupplierRatings()` - All ratings for a supplier
- `isSupplierEligible()` - Check if supplier can operate
- `getTotalSuppliers()` - Total registered suppliers

#### Key Write Functions:
- `registerSupplier()` - Register as fiat supplier with stake + KYC
- `addStake()` - Increase staked amount
- `withdrawStake()` - Withdraw stake (if eligible)
- `updateKYC()` - Update KYC documentation hash
- `rateSupplier()` - Borrower rates supplier (1-5 stars)
- `verifySupplier()` - Admin verifies KYC
- `suspendSupplier()` - Suspend supplier (fraud, etc.)
- `deactivateSupplier()` - Temporarily deactivate
- `reactivateSupplier()` - Re-enable supplier
- `updateReputationScore()` - Update reputation metric

#### Supplier Data Structure:
```
Supplier {
  supplierAddress
  supplierType (INDIVIDUAL, BUSINESS)
  name, businessRegistrationNumber
  kycDocumentHash
  isVerified, isActive
  registeredAt
  totalLoansProvided, totalVolumeProvided
  reputationScore (0-100)
  stakedAmount (minimum stake required)
  averageRating, numberOfRatings
}

Rating {
  borrower, loanId
  rating (1-5 stars)
  review, timestamp
}
```

---

## 3. UI/FRONTEND ARCHITECTURE

### 3.1 Application Pages

| Page | Path | Purpose |
|------|------|---------|
| **Landing** | `/` | Marketing page with FAQ, how it works, CTA |
| **Marketplace** | `/marketplace` | Browse all active loan requests & offers |
| **Borrower Dashboard** | `/borrower-dashboard` | Borrower's active loans, history, create request |
| **Borrower Fiat Offers** | `/borrower-fiat-offers` | Browse fiat offers from suppliers |
| **Lender Dashboard** | `/lender-dashboard` | Lender's active loans, offers, returns |
| **Lender Offer** | `/lender-offer` | Create/manage lender offers |
| **Settings** | `/settings` | User settings, KYC, wallet connections |

---

### 3.2 UI Components & Their Contract Correlations

#### Landing Page Components:
- **LandingNavbar** - Navigation with wallet connect
- **HeroSection** - Value proposition display
- **HowItWorksSection** - Process explanation
- **FAQSection** - Common questions
- **StatsSection** - Platform metrics (TVL, loans, users)
- **CTAAndFooter** - Call-to-action buttons

**ABI Correlation:** 
- `Configuration.getTokenPriceInUSD()` - Display asset values
- `LoanMarketplace.getActiveLoanRequests()` - Display activity stats
- `SupplierRegistry.getTotalSuppliers()` - Show supplier count

---

#### Marketplace Components:
- **MarketplaceNavbar** - Filter & view options
- **MarketplaceToolbar** - Sort, view mode toggle
- **FiltersSection** - APY, duration, collateral filters
- **LoanCard** - Individual loan/offer cards with:
  - `borrowAmount`, `collateralAmount`, `apy`, `ltv`
  - Borrower verification status
  - Time until expiry
  - Funding progress
  - **Action:** Click to accept offer (→ `LoanMarketplace.acceptLenderOffer()`)
- **LoanFeedSection** - Feed of loans

**ABI Correlation:**
- `LoanMarketplace.getActiveLoanRequests()` - Populate borrower requests
- `LoanMarketplace.getActiveLenderOffers()` - Populate lender offers
- `LoanMarketplace.getLenderOfferDetails()` - Get detailed offer info
- `Configuration.calculateHealthFactor()` - Display health metrics
- `Configuration.isAssetSupported()` - Filter valid collaterals

---

#### Borrower Dashboard Components:
- **BorrowerDashboardHeader** - Stats (total borrowed, active loans, APY)
- **BorrowerDashboardSidebar** - Navigation menu
- **ActiveLoansTable** - Current loans with:
  - Status, collateral, amount, due date
  - Health factor
  - Repayment progress
  - **Actions:** Repay, extend, view details
- **PendingRequestsTable** - Loan requests awaiting funding

**ABI Correlation:**
- `LoanMarketplace.loans[]` - Get borrower's loans via `borrowerLoans()`
- `LoanMarketplace.loanRequests[]` - Get borrower's requests
- `LoanMarketplace.calculateRepaymentAmount()` - Show amount due
- `LoanMarketplace.getLoanHealthFactor()` - Display health status
- `CollateralEscrow.getCollateralDetails()` - Show collateral locked
- `Fiat.getBorrowerFiatLoans()` - Show fiat loans separately

---

#### Borrower Fiat Offers Components:
- **FiatOffersToolbar** - Currency filter (USD, EUR, etc.)
- **FiatFiltersSection** - Amount, duration, interest filters
- **FiatOfferCard** - Individual fiat offer cards:
  - Supplier name, rating, verification badge
  - Fiat amount & currency
  - Required collateral (asset & amount)
  - Interest rate, duration
  - **Action:** Click to accept (→ `FiatLoan.acceptFiatLenderOffer()`)

**ABI Correlation:**
- `FiatLoan.getActiveFiatLenderOffers()` - Get active fiat offers
- `FiatLoan.getFiatLenderOfferDetails()` - Offer details
- `SupplierRegistry.getSupplierDetails()` - Supplier profile, rating
- `FiatLoan.supportedCurrencies()` - Filter by fiat type

---

#### Lender Dashboard Components:
- **Stats Cards** - Total supplied, active offers, APY
- **Active Offers Table** - Lender's current offers
- **Active Loans Table** - Lender's funded loans with:
  - Borrower, amount, collateral
  - Interest earned, repayment status
  - **Actions:** Extend approval, liquidate if defaulted

**ABI Correlation:**
- `LoanMarketplace.lenderOffers[]` via `getLenderOffersByLender()`
- `LoanMarketplace.lenderLoans[]` - Get funded loans
- `LoanMarketplace.canLiquidate()` - Show liquidation eligibility
- `LoanMarketplace.calculateLiquidationAmounts()` - Show bonus/amounts

---

#### Lender Offer Creation Component:
- **TextField** - Input fields for:
  - Lend asset (token dropdown)
  - Lend amount (input)
  - Required collateral asset
  - Min collateral amount
  - Interest rate (%)
  - Duration (days)
- **AppButton** - Submit offer (→ `LoanMarketplace.createLenderOffer()`)

**ABI Correlation:**
- `Configuration.isAssetSupported()` - Validate assets
- `Configuration.maxInterestRate()` - Validate interest input
- `Configuration.maxLoanDuration()` - Validate duration input

---

#### Settings Components:
- Wallet connection management
- KYC document upload (for suppliers)
- User profile info
- Supplier registration (if applicable)

**ABI Correlation:**
- `SupplierRegistry.registerSupplier()` - Register as supplier
- `SupplierRegistry.updateKYC()` - Update KYC hash
- `SupplierRegistry.addStake()` - Deposit minimum stake

---

### 3.3 Component Tree Structure

```
App (Layout with Providers)
├── Header
├── Router
│   ├── Landing Page
│   │   ├── LandingNavbar
│   │   ├── HeroSection
│   │   ├── HowItWorksSection
│   │   ├── StatsSection
│   │   ├── FAQSection
│   │   └── CTAAndFooter
│   ├── Marketplace
│   │   ├── MarketplaceNavbar
│   │   ├── MarketplaceToolbar (View mode, sort)
│   │   ├── FiltersSection
│   │   └── LoanFeedSection
│   │       └── LoanCard[] (clickable)
│   ├── BorrowerDashboard
│   │   ├── BorrowerDashboardHeader
│   │   ├── BorrowerDashboardSidebar
│   │   ├── ActiveLoansTable
│   │   └── PendingRequestsTable
│   ├── BorrowerFiatOffers
│   │   ├── FiatOffersToolbar
│   │   ├── FiatFiltersSection
│   │   └── FiatOfferCard[] (clickable)
│   ├── LenderDashboard
│   │   ├── Stats
│   │   ├── ActiveOffersTable
│   │   └── ActiveLoansTable
│   ├── LenderOffer (Create/Edit)
│   │   ├── TextField[] (form inputs)
│   │   └── AppButton (Submit)
│   └── Settings
│       ├── KYC Upload
│       └── Supplier Registration
└── Footer
```

---

## 4. DATA FLOW: FROM UI TO CONTRACTS

### Example 1: Borrower Creating a Loan Request
```
User Input (LenderOfferCard) 
  ↓
Accept Button Click
  ↓
Frontend: Call LoanMarketplace.acceptLenderOffer(offerId, collateralAmount)
  ↓
Contract Logic:
  1. Validate collateral amount vs offer minimum
  2. Transfer collateral tokens to CollateralEscrow via depositCollateral()
  3. Create Loan record with LenderOffer terms
  4. Emit LenderOfferAccepted event
  ↓
Frontend: Listen for LoanFunded event
  ↓
Display: "Loan Created" notification, update dashboard
```

### Example 2: Lender Liquidating Defaulted Loan
```
Dashboard: Show "canLiquidate=true"
  ↓
User clicks Liquidate button
  ↓
Frontend: Get liquidation details
  1. Call LoanMarketplace.calculateLiquidationAmounts(loanId)
  2. Get debtToRepay, collateralToSeize, bonusAmount
  ↓
Call LoanMarketplace.liquidateLoan(loanId)
  ↓
Contract Logic:
  1. Verify loan is liquidatable (health factor < threshold)
  2. Call CollateralEscrow.seizeCollateral()
  3. Transfer seized collateral + bonus to lender
  4. Emit LoanLiquidated event
  ↓
Frontend: Update dashboard showing liquidation complete
```

### Example 3: Fiat Loan Flow
```
Borrower: Browse FiatOfferCards
  ↓
Click Accept → FiatLoan.acceptFiatLenderOffer(offerId, collateralAmount)
  ↓
Supplier receives notification
  ↓
Supplier confirms transfer off-chain (bank wire, etc.)
  ↓
Supplier uploads proof → FiatLoan.confirmFiatTransfer(loanId, proofHash)
  ↓
Borrower confirms fiat received → FiatLoan.confirmFiatReceipt(loanId)
  ↓
Loan Status: ACTIVE (borrower now owes supplier in fiat currency)
  ↓
Borrower repays fiat off-chain (bank transfer, etc.)
  ↓
Borrower uploads proof → FiatLoan.confirmFiatRepayment(loanId, proofHash)
  ↓
Supplier confirms repayment → FiatLoan.confirmRepaymentReceived(loanId)
  ↓
CollateralEscrow.releaseCollateral() is called
  ↓
Loan Status: COMPLETED, collateral returned to borrower
```

---

## 5. KEY DESIGN CORRELATIONS

### Health Factor Display
- **Contract Source:** `Configuration.calculateHealthFactor(collateralAsset, collateralAmount, borrowAsset, totalDebt)`
- **UI Display:** Shown in LoanCard, Dashboard tables
- **Color Coding:** Green (>2.0), Yellow (1.5-2.0), Red (<1.5)
- **Purpose:** Shows loan safety; below threshold = liquidatable

### Interest Rate & APY
- **Contract Constraints:** `Configuration.maxInterestRate()` caps rates
- **UI Input:** LenderOfferCreation form validates against max
- **Calculation:** `(interestRate * duration / 365)` = APY
- **Display:** LoanCard shows APY, Dashboard shows earned interest

### Collateral Ratio (LTV - Loan-to-Value)
- **Formula:** `LoanAmount / CollateralValue USD = LTV%`
- **Contract Constraint:** `Configuration.minCollateralRatio()` sets minimum
- **UI Display:** LoanCard shows LTV%, users can't create below ratio
- **Example:** 50% LTV = borrower must provide $2K collateral for $1K loan

### Liquidation Mechanics
- **Trigger:** `LoanMarketplace.canLiquidate(loanId)` returns true when:
  - Loan is past dueDate
  - OR Health factor < `liquidationThreshold`
  - AND within grace period
- **Calculation:** `calculateLiquidationAmounts()` returns:
  - `debtToRepay` - Full outstanding debt
  - `collateralToSeize` - Collateral amount to liquidate
  - `bonusAmount` - Liquidator reward (incentive)
- **UI:** Shows "Liquidatable" badge, Liquidate button in LenderDashboard

### Fiat Currency Support
- **Supported:** USD, EUR, etc. (configurable in `FiatLoan.supportedCurrencies()`)
- **Off-Chain Proof:** Uses `proofHash` (IPFS hash, signature, etc.) to verify:
  - Fiat transfer was made (supplier confirmation)
  - Fiat repayment was received (borrower confirmation)
- **UI:** Currency dropdown in FiatOffers, stores fiat type in loan record

### Supplier Reputation System
- **Verification:** KYC hash stored in `SupplierRegistry`
- **Rating:** Borrowers rate suppliers 1-5 stars after loan completion
- **Reputation Score:** Calculated from:
  - Average rating
  - Total loans provided
  - Total volume
  - No disputes
- **UI Display:** Supplier badge in FiatOfferCard shows:
  - ✓ Verified badge (if KYC approved)
  - ⭐ Average rating (e.g., 4.8/5.0)
  - Number of ratings

### Staking/Collateral from Suppliers
- **Minimum Stake:** `SupplierRegistry.minimumSupplierStake()`
- **Purpose:** Bond amount that can be seized if supplier defaults on fiat transfer
- **Flow:** `registerSupplier()` requires paying stake, `withdrawStake()` returns it
- **Risk:** Suppliers lose stake if disputes resolved against them

---

## 6. TYPES & ENUMS

### Loan Status (across contracts)
```typescript
enum LoanStatus {
  PENDING,        // Awaiting lender funding (crypto marketplace)
  ACTIVE,         // Funded, borrower has funds/collateral locked
  COMPLETED,      // Fully repaid
  DEFAULTED,      // Past due, grace period expired
  LIQUIDATED,     // Collateral seized
  CANCELLED,      // Cancelled by borrower
  DISPUTED        // Dispute raised
}
```

### Supplier Type (SupplierRegistry)
```typescript
enum SupplierType {
  INDIVIDUAL,     // P2P supplier
  BUSINESS        // Institutional/fintech supplier
}
```

---

## 7. KEY WORKFLOWS MAPPED TO ABI

### Workflow: Create Crypto Loan Request (Borrower)
1. **UI:** BorrowerDashboard → "Create Request"
2. **Form Inputs:** Collateral token, amount, borrow asset, amount, interest, duration
3. **Validation:**
   - `Configuration.isAssetSupported(collateralToken)` ✓
   - `Configuration.isAssetSupported(borrowAsset)` ✓
   - Duration check: `minLoanDuration <= duration <= maxLoanDuration`
   - Collateral calc: `Configuration.calculateCollateralValueInUSD()` vs loan
4. **Contract Call:** `LoanMarketplace.createLoanRequest(collateral, amount, asset, amount, rate, duration)`
5. **Event:** `LoanRequestCreated` emitted
6. **UI Update:** Add to PendingRequestsTable

---

### Workflow: Fund Loan Request (Lender)
1. **UI:** Marketplace LoanCard → "Fund" button
2. **Contract Check:** 
   - Request still active? `LoanMarketplace.loanRequests[requestId].status == PENDING`
   - Get details: `getLenderOfferDetails(offerId)` or direct match
3. **Contract Call:** `LoanMarketplace.fundLoanRequest(requestId)` OR `acceptLenderOffer(offerId, collateralAmount)`
4. **Collateral Movement:**
   - Borrower's collateral tokens → `CollateralEscrow` via `depositCollateral()`
5. **Loan Creation:** `LoanMarketplace.loans[loanId]` record created
6. **Event:** `LoanFunded` emitted
7. **UI Update:** Remove from marketplace, add to borrower/lender dashboards

---

### Workflow: Repay Crypto Loan
1. **UI:** BorrowerDashboard → ActiveLoansTable → "Repay"
2. **Pre-Check:**
   - Amount due: `LoanMarketplace.calculateRepaymentAmount(loanId)`
   - Health factor: `LoanMarketplace.getLoanHealthFactor(loanId)` (display only)
3. **Contract Call:** `LoanMarketplace.repayLoan(loanId, repayAmount)`
4. **Behind the Scenes:**
   - Borrow tokens transferred from borrower to contract
   - Update loan.amountRepaid
   - If fully repaid: `CollateralEscrow.releaseCollateral()` returns collateral
5. **Event:** `LoanRepaid` or `LoanFullyRepaid` emitted
6. **UI Update:** Update loan status, collateral released message

---

### Workflow: Create Fiat Lender Offer (Supplier)
1. **UI:** LenderOffer page (or Settings if supplier) → Form
2. **Prerequisites:**
   - Must be registered: `SupplierRegistry.suppliers[address]` exists
   - Must be verified: `SupplierRegistry.suppliers[address].isVerified == true`
   - Must have stake: `SupplierRegistry.suppliers[address].stakedAmount >= minimumSupplierStake()`
3. **Form Inputs:** Fiat amount, currency, collateral asset, min collateral, rate, duration
4. **Validation:**
   - `FiatLoan.supportedCurrencies(currency)` ✓
   - Collateral asset supported
5. **Contract Call:** `FiatLoan.createFiatLenderOffer(amount, currency, asset, minAmount, rate, duration)`
6. **Event:** `FiatLenderOfferCreated` emitted
7. **UI Update:** Offer appears in BorrowerFiatOffers marketplace

---

### Workflow: Accept Fiat Offer (Borrower)
1. **UI:** BorrowerFiatOffers → FiatOfferCard → "Accept"
2. **Collateral Deposit:**
   - `CollateralEscrow.depositCollateral(loanId, borrower, token, amount, isCryptoLoan=false)`
3. **Contract Call:** `FiatLoan.acceptFiatLenderOffer(offerId, collateralAmount, proofHash="")`
4. **Loan Created:** `FiatLoan.fiatLoans[loanId]` record with status PENDING
5. **Event:** `FiatLenderOfferAccepted` emitted
6. **UI Update:** Show pending confirmation, awaiting supplier transfer

---

### Workflow: Confirm Fiat Transfer (Supplier)
1. **Supplier Action:** Sends fiat off-chain (bank wire, etc.)
2. **Supplier Uploads:** Proof of transfer (receipt, transaction ID, signature hash)
3. **Contract Call:** `FiatLoan.confirmFiatTransfer(loanId, proofHash=ipfsHash)`
4. **Event:** `FiatTransferConfirmed` emitted
5. **UI Update:** Supplier dashboard shows "Awaiting Borrower Confirmation"

---

### Workflow: Borrower Confirms Fiat Receipt
1. **Borrower Action:** Verifies fiat received in bank account
2. **Contract Call:** `FiatLoan.confirmFiatReceipt(loanId)`
3. **State Change:** `FiatLoan.fiatLoans[loanId].status = ACTIVE`
4. **Event:** `FiatReceiptConfirmed` emitted
5. **UI Update:** Loan moves to active loans, repayment timer starts

---

### Workflow: Liquidate Defaulted Crypto Loan (Lender)
1. **UI:** LenderDashboard → ActiveLoansTable → Check health factor
2. **Eligibility Check:**
   - `LoanMarketplace.canLiquidate(loanId)` returns true
   - Loan is past dueDate OR health factor < liquidationThreshold
3. **Get Details:**
   - `LoanMarketplace.calculateLiquidationAmounts(loanId)` → {debtToRepay, collateralToSeize, bonusAmount}
4. **Contract Call:** `LoanMarketplace.liquidateLoan(loanId)`
5. **Collateral Seizure:**
   - `CollateralEscrow.seizeCollateral()` transfers collateral to lender
   - Lender receives: seized collateral + bonus amount
6. **Event:** `LoanLiquidated` emitted
7. **UI Update:** Loan status = LIQUIDATED, removed from active, added to history

---

### Workflow: Liquidate Fiat Loan (Admin)
1. **Trigger:** Fiat loan past grace period, no repayment
2. **Contract Call:** `FiatLoan.liquidateFiatLoan(loanId)`
3. **Collateral Seizure:**
   - `CollateralEscrow.seizeCollateral()` → collateral goes to supplier/treasury
4. **Event:** `FiatLoanLiquidated` emitted
5. **UI Update:** Loan status = LIQUIDATED

---

## 8. FRONTEND INTEGRATION SUMMARY

### Contract Interactions Required:
1. **Read-Only (view calls):**
   - Display loan details, rates, offers
   - Calculate metrics (health factor, APY, repayment amount)
   - Check eligibility (asset support, rate limits)
   - List active loans/offers/requests

2. **Write Operations:**
   - Create loan requests/offers
   - Accept offers
   - Repay loans
   - Liquidate defaulted loans
   - Manage supplier profiles
   - Rate suppliers

### UI State Management:
- Connected wallet address (Wagmi, Rainbow Kit)
- Currently viewing loan/offer details
- Form data (new loan request/offer parameters)
- Real-time loan status (active, repayment progress)

### Key Libraries Used:
- **Wagmi** - React hooks for contract interactions
- **Viem** - Ethereum client library
- **Rainbow Kit** - Wallet connection UI
- **React Query** - Data fetching & caching
- **Material UI** - Component library

---

## 9. CONFIGURATION PARAMETERS (Defaults from Contract)

| Parameter | Purpose | Expected Range |
|-----------|---------|-----------------|
| `minCollateralRatio` | Minimum collateral safety | 120-150% |
| `maxInterestRate` | Capped annual interest | 25-50% APR |
| `minLoanDuration` | Shortest loan term | 7-14 days |
| `maxLoanDuration` | Longest loan term | 180-365 days |
| `gracePeriod` | Default forgiveness window | 3-7 days |
| `liquidationThreshold` | Health factor trigger | 1.2-1.5x |
| `platformFeeRate` | Fee % on loans | 0.5-2% |
| `minimumSupplierStake` | Bond for suppliers | 0.1-1 ETH |

---

## 10. SUMMARY TABLE: FEATURE → CONTRACT MAPPING

| Feature | Contract | Functions | Events |
|---------|----------|-----------|--------|
| Create Loan Request | LoanMarketplace | `createLoanRequest()` | `LoanRequestCreated` |
| Create Lender Offer | LoanMarketplace | `createLenderOffer()` | `LenderOfferCreated` |
| Fund Loan | LoanMarketplace | `fundLoanRequest()`, `acceptLenderOffer()` | `LoanFunded` |
| Deposit Collateral | CollateralEscrow | `depositCollateral()` | `CollateralDeposited` |
| Repay Loan | LoanMarketplace | `repayLoan()` | `LoanRepaid` |
| Release Collateral | CollateralEscrow | `releaseCollateral()` | `CollateralReleased` |
| Liquidate Loan | LoanMarketplace | `liquidateLoan()` | `LoanLiquidated` |
| Seize Collateral | CollateralEscrow | `seizeCollateral()` | `CollateralSeized` |
| Create Fiat Offer | FiatLoanBridge | `createFiatLenderOffer()` | `FiatLenderOfferCreated` |
| Accept Fiat Offer | FiatLoanBridge | `acceptFiatLenderOffer()` | `FiatLenderOfferAccepted` |
| Confirm Fiat Transfer | FiatLoanBridge | `confirmFiatTransfer()` | `FiatTransferConfirmed` |
| Register Supplier | SupplierRegistry | `registerSupplier()` | `SupplierRegistered` |
| Verify KYC | SupplierRegistry | `verifySupplier()` | `SupplierVerified` |
| Rate Supplier | SupplierRegistry | `rateSupplier()` | `SupplierRated` |
| Calculate Health | Configuration | `calculateHealthFactor()` | - |
| Get Token Price | Configuration | `getTokenPriceInUSD()` | - |

---

**End of Analysis**

This document provides a comprehensive view of how the contract ABIs, addresses, and functionality correlate with the frontend UI design and user flows.
