# 16 — Multi-cloud patterns (Terraform)

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

provider "azurerm" {
  features {}
}

provider "google" {
  project = "my-project"
  region  = "us-central1"
}

# === Active-active: AWS primary, Azure backup ===
module "aws_primary" {
  source = "./modules/aws"
  environment = "primary"
}

module "azure_secondary" {
  source = "./modules/azure"
  environment = "secondary"
}

module "gcp_analytics" {
  source = "./modules/gcp"
  environment = "analytics"
}

# === DNS failover ===
resource "aws_route53_record" "primary" {
  zone_id = "Z123ABC"
  name    = "api.example.com"
  type    = "A"
  alias {
    name                   = module.aws_primary.alb_dns_name
    zone_id                = module.aws_primary.alb_zone_id
    evaluate_target_health = true
  }
  failover_routing_policy_id = aws_route53_health_check.primary.id
}

# === Cross-cloud IAM federation ===
# AWS role trusts Azure AD
data "azuread_application" "github_actions" {
  display_name = "github-actions"
}

# GCP workload identity
resource "google_service_account" "app" {
  account_id   = "app"
  display_name = "App"
}

# ... etc.