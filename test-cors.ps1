# Test CORS directly on backend (bypassing API Gateway)
# This helps diagnose if the issue is with API Gateway or backend

$BACKEND_URL = "http://34.111.59.90.nip.io"
$ORIGIN = "http://amori.co.kr"

Write-Host "Testing CORS on backend directly..." -ForegroundColor Cyan

# Test 1: OPTIONS request (preflight)
Write-Host "`n=== Test 1: OPTIONS Preflight ===" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$BACKEND_URL/api/auth/signup" `
        -Method OPTIONS `
        -Headers @{
            "Origin" = $ORIGIN
            "Access-Control-Request-Method" = "POST"
            "Access-Control-Request-Headers" = "content-type"
        } `
        -UseBasicParsing `
        -ErrorAction Stop

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "CORS Headers:"
    $response.Headers.GetEnumerator() | Where-Object { $_.Key -like "Access-Control-*" } | ForEach-Object {
        Write-Host "  $($_.Key): $($_.Value)" -ForegroundColor Green
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Actual POST request
Write-Host "`n=== Test 2: POST Request ===" -ForegroundColor Yellow
try {
    $boundary = [System.Guid]::NewGuid().ToString()
    $bodyLines = @(
        "--$boundary",
        'Content-Disposition: form-data; name="email"',
        '',
        'test@test.com',
        "--$boundary",
        'Content-Disposition: form-data; name="name"',
        '',
        'Test User',
        "--$boundary",
        'Content-Disposition: form-data; name="password"',
        '',
        'testpassword123',
        "--$boundary--"
    )
    $body = $bodyLines -join "`r`n"

    $response = Invoke-WebRequest -Uri "$BACKEND_URL/api/auth/signup" `
        -Method POST `
        -Headers @{
            "Origin" = $ORIGIN
            "Content-Type" = "multipart/form-data; boundary=$boundary"
        } `
        -Body $body `
        -UseBasicParsing `
        -ErrorAction Stop

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "CORS Headers:"
    $response.Headers.GetEnumerator() | Where-Object { $_.Key -like "Access-Control-*" } | ForEach-Object {
        Write-Host "  $($_.Key): $($_.Value)" -ForegroundColor Green
    }
} catch {
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nIf you see Access-Control-Allow-Origin headers, backend CORS is working." -ForegroundColor Cyan
Write-Host "The issue is likely with API Gateway not forwarding these headers." -ForegroundColor Cyan
