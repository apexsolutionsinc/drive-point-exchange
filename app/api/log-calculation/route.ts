import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Log comprehensive calculation breakdown to server terminal (PowerShell/npm run dev)
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║         AUTO LOAN REFINANCE CALCULATION BREAKDOWN          ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');
    
    console.log('📊 INPUTS:');
    console.log('  Current Monthly Payment (M):  $' + data.currentMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('  Loan Balance Remaining (P):  $' + data.balanceLeft.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('  Current APR (Annual):         ' + data.currentApr.toFixed(2) + '%');
    console.log('  Monthly Rate (r):             ' + (data.monthlyRate * 100).toFixed(4) + '%');
    console.log('  Remaining Term (Years):       ' + data.remainingTermYears);
    console.log('  Remaining Term (Months):      ' + data.remainingTermMonths);
    console.log('  New APR (Annual):             ' + data.newApr.toFixed(2) + '%');
    console.log('  New Monthly Rate (r_new):     ' + (data.newMonthlyRate * 100).toFixed(4) + '%');
    console.log('  New Term (Years):             ' + data.newTermYears);
    console.log('  New Term (Months):             ' + data.newTermMonths);
    
    console.log('\n🔢 CALCULATIONS:');
    console.log('  Expected Payment (calculated): $' + data.calculatedPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('  Payment Difference:            $' + Math.abs(data.paymentDifference).toFixed(2));
    console.log('  Payment Validation:            ' + (data.isPaymentValid ? '✓ Valid' : '⚠ Warning (>$1 difference)'));
    
    console.log('\n  Current Plan Interest:');
    console.log('    Total Paid:                  $' + (data.currentMonthlyPayment * data.remainingTermMonths).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('    Principal:                   $' + data.balanceLeft.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('    Interest Remaining:          $' + data.currentTotalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    
    console.log('\n  New Plan:');
    console.log('    New Monthly Payment:         $' + data.newMonthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('    Total Paid:                  $' + (data.newMonthlyPayment * data.newTermMonths).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('    Principal:                   $' + data.balanceLeft.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('    New Total Interest:          $' + data.newTotalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    
    console.log('\n💰 SAVINGS:');
    console.log('  Monthly Savings:               $' + data.monthlySavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    console.log('  Interest Savings:              $' + data.interestSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    
    console.log('\n⚠️  WARNINGS:');
    console.log('  Payment Warning:               ' + (data.hasPaymentWarning ? '⚠ Payment too low to cover interest' : '✓ OK'));
    console.log('  Payment Validation Warning:    ' + (data.hasPaymentValidationWarning ? '⚠ Payment differs from calculated' : '✓ OK'));
    
    console.log('\n╚══════════════════════════════════════════════════════════════╝\n');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging calculation:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

