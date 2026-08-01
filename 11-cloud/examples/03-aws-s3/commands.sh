# 03 — S3 operations (shell)

# Create a bucket
aws s3api create-bucket --bucket my-bucket --region us-east-1

# Block public access (always do this!)
aws s3api put-public-access-block --bucket my-bucket \
    --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Enable versioning
aws s3api put-bucket-versioning --bucket my-bucket \
    --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption --bucket my-bucket \
    --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"aws:kms","KMSMasterKeyID":"alias/my-key"}}]}'

# Lifecycle policy: transition to Glacier after 90 days
cat > lifecycle.json <<EOF
{
    "Rules": [
        {
            "Id": "ArchiveRule",
            "Status": "Enabled",
            "Filter": {"Prefix": ""},
            "Transitions": [
                {
                    "Days": 90,
                    "StorageClass": "GLACIER"
                }
            ],
            "Expiration": {"Days": 3650}
        }
    ]
}
EOF
aws s3api put-bucket-lifecycle-configuration --bucket my-bucket \
    --lifecycle-configuration file://lifecycle.json

# Cross-region replication
aws s3api put-bucket-replication --bucket my-bucket \
    --replication-configuration '{
        "Role": "arn:aws:iam::123456789:role/replication-role",
        "Rules": [{
            "Status": "Enabled",
            "Destination": {"Bucket": "arn:aws:s3:::my-bucket-replica"},
            "Priority": 1
        }]
    }'

# Upload
aws s3 cp file.txt s3://my-bucket/file.txt
aws s3 sync ./local-dir s3://my-bucket/remote-dir/

# Generate pre-signed URL (1 hour expiry)
aws s3 presign s3://my-bucket/file.txt --expires-in 3600

# List
aws s3 ls s3://my-bucket/

# Delete
aws s3 rm s3://my-bucket/file.txt

# Delete bucket
aws s3api delete-bucket --bucket my-bucket