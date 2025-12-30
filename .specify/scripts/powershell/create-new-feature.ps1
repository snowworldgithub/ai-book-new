param(
    [Parameter(Mandatory=$true)]
    [string]$Json,

    [Parameter(Mandatory=$false)]
    [int]$Number = 1,

    [Parameter(Mandatory=$true)]
    [string]$ShortName,

    [Parameter(Mandatory=$false)]
    [string]$Description = ""
)

# Create feature branch and spec directory
$branchName = "${Number}-${ShortName}"
$specDir = "specs/${branchName}"

# Create spec directory if it doesn't exist
if (!(Test-Path $specDir)) {
    New-Item -ItemType Directory -Path $specDir -Force | Out-Null
}

# Output JSON with branch name and spec file path
$result = @{
    BRANCH_NAME = $branchName
    SPEC_FILE = "${specDir}/spec.md"
} | ConvertTo-Json

Write-Output $result