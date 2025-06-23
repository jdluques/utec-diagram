from diagrams.aws.analytics import *
from diagrams.aws.ar import *
from diagrams.aws.blockchain import *
from diagrams.aws.business import *
from diagrams.aws.compute import *
from diagrams.aws.cost import *
from diagrams.aws.database import *
from diagrams.aws.devtools import *
from diagrams.aws.enablement import *
from diagrams.aws.enduser import *
from diagrams.aws.engagement import *
from diagrams.aws.game import *
from diagrams.aws.general import *
from diagrams.aws.integration import *
from diagrams.aws.iot import *
from diagrams.aws.management import *
from diagrams.aws.media import *
from diagrams.aws.migration import *
from diagrams.aws.ml import *
from diagrams.aws.mobile import *
from diagrams.aws.network import *
from diagrams.aws.quantum import *
from diagrams.aws.robotics import *
from diagrams.aws.satellite import *
from diagrams.aws.security import *
from diagrams.aws.storage import *

node_types = {
    # Analytics
    "AmazonOpensearchService": AmazonOpensearchService,
    "Analytics": Analytics,
    "Athena": Athena,
    "CloudsearchSearchDocuments": CloudsearchSearchDocuments,
    "Cloudsearch": Cloudsearch,
    "DataLakeResource": DataLakeResource,
    "DataPipeline": DataPipeline,
    "ElasticsearchService": ElasticsearchService,
    "ES": ElasticsearchService,  # Alias
    "EMRCluster": EMRCluster,
    "EMREngineMaprM3": EMREngineMaprM3,
    "EMREngineMaprM5": EMREngineMaprM5,
    "EMREngineMaprM7": EMREngineMaprM7,
    "EMREngine": EMREngine,
    "EMRHdfsCluster": EMRHdfsCluster,
    "EMR": EMR,
    "GlueCrawlers": GlueCrawlers,
    "GlueDataCatalog": GlueDataCatalog,
    "Glue": Glue,
    "KinesisDataAnalytics": KinesisDataAnalytics,
    "KinesisDataFirehose": KinesisDataFirehose,
    "KinesisDataStreams": KinesisDataStreams,
    "KinesisVideoStreams": KinesisVideoStreams,
    "Kinesis": Kinesis,
    "LakeFormation": LakeFormation,
    "ManagedStreamingForKafka": ManagedStreamingForKafka,
    "Quicksight": Quicksight,
    "RedshiftDenseComputeNode": RedshiftDenseComputeNode,
    "RedshiftDenseStorageNode": RedshiftDenseStorageNode,
    "Redshift": Redshift,

    # Augmented Reality
    "ArVr": ArVr,
    "Sumerian": Sumerian,

    # Blockchain
    "BlockchainResource": BlockchainResource,
    "Blockchain": Blockchain,
    "ManagedBlockchain": ManagedBlockchain,
    "QuantumLedgerDatabaseQldb": QuantumLedgerDatabaseQldb,
    "QLDB": QuantumLedgerDatabaseQldb,  # Alias

    # Business Applications
    "BlockchainResource": BlockchainResource,
    "Blockchain": Blockchain,
    "ManagedBlockchain": ManagedBlockchain,
    "QuantumLedgerDatabaseQldb": QuantumLedgerDatabaseQldb,
    "QLDB": QuantumLedgerDatabaseQldb,  # Alias

    # Compute
    "AppRunner": AppRunner,
    "ApplicationAutoScaling": ApplicationAutoScaling,
    "AutoScaling": ApplicationAutoScaling,  # Alias

    "Batch": Batch,
    "ComputeOptimizer": ComputeOptimizer,
    "Compute": Compute,

    "EC2Ami": EC2Ami,
    "AMI": EC2Ami,  # Alias
    "EC2AutoScaling": EC2AutoScaling,
    "EC2ContainerRegistryImage": EC2ContainerRegistryImage,
    "EC2ContainerRegistryRegistry": EC2ContainerRegistryRegistry,
    "EC2ContainerRegistry": EC2ContainerRegistry,
    "ECR": EC2ContainerRegistry,  # Alias
    "EC2ElasticIpAddress": EC2ElasticIpAddress,
    "EC2ImageBuilder": EC2ImageBuilder,
    "EC2Instance": EC2Instance,
    "EC2Instances": EC2Instances,
    "EC2Rescue": EC2Rescue,
    "EC2SpotInstance": EC2SpotInstance,
    "EC2": EC2,

    "ElasticBeanstalkApplication": ElasticBeanstalkApplication,
    "ElasticBeanstalkDeployment": ElasticBeanstalkDeployment,
    "ElasticBeanstalk": ElasticBeanstalk,
    "EB": ElasticBeanstalk,  # Alias

    "ElasticContainerServiceContainer": ElasticContainerServiceContainer,
    "ElasticContainerServiceService": ElasticContainerServiceService,
    "ElasticContainerService": ElasticContainerService,
    "ECS": ElasticContainerService,  # Alias

    "ElasticKubernetesService": ElasticKubernetesService,
    "EKS": ElasticKubernetesService,  # Alias

    "Fargate": Fargate,
    "LambdaFunction": LambdaFunction,
    "Lambda": Lambda,

    "Lightsail": Lightsail,
    "LocalZones": LocalZones,
    "Outposts": Outposts,
    "ServerlessApplicationRepository": ServerlessApplicationRepository,
    "SAR": ServerlessApplicationRepository,  # Alias

    # Thinkbox Suite
    "ThinkboxDeadline": ThinkboxDeadline,
    "ThinkboxDraft": ThinkboxDraft,
    "ThinkboxFrost": ThinkboxFrost,
    "ThinkboxKrakatoa": ThinkboxKrakatoa,
    "ThinkboxSequoia": ThinkboxSequoia,
    "ThinkboxStoke": ThinkboxStoke,
    "ThinkboxXmesh": ThinkboxXmesh,

    "VmwareCloudOnAWS": VmwareCloudOnAWS,
    "Wavelength": Wavelength,

    # Cost
    "Budgets": Budgets,
    "CostAndUsageReport": CostAndUsageReport,
    "CostExplorer": CostExplorer,
    "CostManagement": CostManagement,
    "ReservedInstanceReporting": ReservedInstanceReporting,
    "SavingsPlans": SavingsPlans,
    
    # Database
    "AuroraInstance": AuroraInstance,
    "Aurora": Aurora,
    "DatabaseMigrationServiceDatabaseMigrationWorkflow": DatabaseMigrationServiceDatabaseMigrationWorkflow,
    "DatabaseMigrationService": DatabaseMigrationService,  # alias: DMS
    "Database": Database,  # alias: DB
    "DocumentdbMongodbCompatibility": DocumentdbMongodbCompatibility,  # alias: DocumentDB
    "DynamodbAttribute": DynamodbAttribute,
    "DynamodbAttributes": DynamodbAttributes,
    "DynamodbDax": DynamodbDax,  # alias: DAX
    "DynamodbGlobalSecondaryIndex": DynamodbGlobalSecondaryIndex,  # alias: DynamodbGSI
    "DynamodbItem": DynamodbItem,
    "DynamodbItems": DynamodbItems,
    "DynamodbStreams": DynamodbStreams,
    "DynamodbTable": DynamodbTable,
    "Dynamodb": Dynamodb,  # alias: DDB
    "ElasticacheCacheNode": ElasticacheCacheNode,
    "ElasticacheForMemcached": ElasticacheForMemcached,
    "ElasticacheForRedis": ElasticacheForRedis,
    "Elasticache": Elasticache,  # alias: ElastiCache
    "KeyspacesManagedApacheCassandraService": KeyspacesManagedApacheCassandraService,
    "Neptune": Neptune,
    "QuantumLedgerDatabaseQldb": QuantumLedgerDatabaseQldb,  # alias: QLDB
    "RDSInstance": RDSInstance,
    "RDSMariadbInstance": RDSMariadbInstance,
    "RDSMysqlInstance": RDSMysqlInstance,
    "RDSOnVmware": RDSOnVmware,
    "RDSOracleInstance": RDSOracleInstance,
    "RDSPostgresqlInstance": RDSPostgresqlInstance,
    "RDSSqlServerInstance": RDSSqlServerInstance,
    "RDS": RDS,
    "RedshiftDenseComputeNode": RedshiftDenseComputeNode,
    "RedshiftDenseStorageNode": RedshiftDenseStorageNode,
    "Redshift": Redshift,
    "Timestream": Timestream,

    # DevTools
    "CloudDevelopmentKit": CloudDevelopmentKit,
    "Cloud9Resource": Cloud9Resource,
    "Cloud9": Cloud9,
    "Codeartifact": Codeartifact,
    "Codebuild": Codebuild,
    "Codecommit": Codecommit,
    "Codedeploy": Codedeploy,
    "Codepipeline": Codepipeline,
    "Codestar": Codestar,
    "CommandLineInterface": CommandLineInterface,  # alias: CLI
    "DeveloperTools": DeveloperTools,  # alias: DevTools
    "ToolsAndSdks": ToolsAndSdks,
    "XRay": XRay,

    # Enablement
    "CustomerEnablement": CustomerEnablement,
    "Iq": Iq,
    "ManagedServices": ManagedServices,
    "ProfessionalServices": ProfessionalServices,
    "Support": Support,

    # End User Computing
    "Appstream20": Appstream20,
    "DesktopAndAppStreaming": DesktopAndAppStreaming,
    "Workdocs": Workdocs,
    "Worklink": Worklink,
    "Workspaces": Workspaces,

    # Customer Engagement
    "Connect": Connect,
    "CustomerEngagement": CustomerEngagement,
    "Pinpoint": Pinpoint,
    "SimpleEmailServiceSesEmail": SimpleEmailServiceSesEmail,
    "SimpleEmailServiceSes": SimpleEmailServiceSes,  # alias: SES

    # Game Tech
    "GameTech": GameTech,
    "Gamelift": Gamelift,

    # General
    "Client": Client,
    "Disk": Disk,
    "Forums": Forums,
    "General": General,
    "GenericDatabase": GenericDatabase,
    "GenericFirewall": GenericFirewall,
    "GenericOfficeBuilding": GenericOfficeBuilding,  # alias: OfficeBuilding
    "GenericSamlToken": GenericSamlToken,
    "GenericSDK": GenericSDK,
    "InternetAlt1": InternetAlt1,
    "InternetAlt2": InternetAlt2,
    "InternetGateway": InternetGateway,
    "Marketplace": Marketplace,
    "MobileClient": MobileClient,
    "Multimedia": Multimedia,
    "OfficeBuilding": OfficeBuilding,
    "SamlToken": SamlToken,
    "SDK": SDK,
    "SslPadlock": SslPadlock,
    "TapeStorage": TapeStorage,
    "Toolkit": Toolkit,
    "TraditionalServer": TraditionalServer,
    "User": User,
    "Users": Users,

    # Integration
    "ApplicationIntegration": ApplicationIntegration,
    "Appsync": Appsync,
    "ConsoleMobileApplication": ConsoleMobileApplication,
    "EventResource": EventResource,
    "EventbridgeCustomEventBusResource": EventbridgeCustomEventBusResource,
    "EventbridgeDefaultEventBusResource": EventbridgeDefaultEventBusResource,
    "EventbridgeSaasPartnerEventBusResource": EventbridgeSaasPartnerEventBusResource,
    "Eventbridge": Eventbridge,
    "ExpressWorkflows": ExpressWorkflows,
    "MQ": MQ,
    "SimpleNotificationServiceSnsEmailNotification": SimpleNotificationServiceSnsEmailNotification,
    "SimpleNotificationServiceSnsHttpNotification": SimpleNotificationServiceSnsHttpNotification,
    "SimpleNotificationServiceSnsTopic": SimpleNotificationServiceSnsTopic,
    "SimpleNotificationServiceSns": SimpleNotificationServiceSns,  # alias: SNS
    "SimpleQueueServiceSqsMessage": SimpleQueueServiceSqsMessage,
    "SimpleQueueServiceSqsQueue": SimpleQueueServiceSqsQueue,
    "SimpleQueueServiceSqs": SimpleQueueServiceSqs,  # alias: SQS
    "StepFunctions": StepFunctions,  # alias: SF

    # Internet of Things
    "Freertos": Freertos,  # alias: FreeRTOS
    "InternetOfThings": InternetOfThings,
    "Iot1Click": Iot1Click,
    "IotAction": IotAction,
    "IotActuator": IotActuator,
    "IotAlexaEcho": IotAlexaEcho,
    "IotAlexaEnabledDevice": IotAlexaEnabledDevice,
    "IotAlexaSkill": IotAlexaSkill,
    "IotAlexaVoiceService": IotAlexaVoiceService,
    "IotAnalyticsChannel": IotAnalyticsChannel,
    "IotAnalyticsDataSet": IotAnalyticsDataSet,
    "IotAnalyticsDataStore": IotAnalyticsDataStore,
    "IotAnalyticsNotebook": IotAnalyticsNotebook,
    "IotAnalyticsPipeline": IotAnalyticsPipeline,
    "IotAnalytics": IotAnalytics,
    "IotBank": IotBank,
    "IotBicycle": IotBicycle,
    "IotButton": IotButton,
    "IotCamera": IotCamera,
    "IotCar": IotCar,
    "IotCart": IotCart,
    "IotCertificate": IotCertificate,
    "IotCoffeePot": IotCoffeePot,
    "IotCore": IotCore,
    "IotDesiredState": IotDesiredState,
    "IotDeviceDefender": IotDeviceDefender,
    "IotDeviceGateway": IotDeviceGateway,
    "IotDeviceManagement": IotDeviceManagement,
    "IotDoorLock": IotDoorLock,
    "IotEvents": IotEvents,
    "IotFactory": IotFactory,
    "IotFireTvStick": IotFireTvStick,
    "IotFireTv": IotFireTv,
    "IotGeneric": IotGeneric,
    "IotGreengrassConnector": IotGreengrassConnector,
    "IotGreengrass": IotGreengrass,
    "IotHardwareBoard": IotHardwareBoard,  # alias: IotBoard
    "IotHouse": IotHouse,
    "IotHttp": IotHttp,
    "IotHttp2": IotHttp2,
    "IotJobs": IotJobs,
    "IotLambda": IotLambda,
    "IotLightbulb": IotLightbulb,
    "IotMedicalEmergency": IotMedicalEmergency,
    "IotMqtt": IotMqtt,
    "IotOverTheAirUpdate": IotOverTheAirUpdate,
    "IotPolicyEmergency": IotPolicyEmergency,
    "IotPolicy": IotPolicy,
    "IotReportedState": IotReportedState,
    "IotRule": IotRule,
    "IotSensor": IotSensor,
    "IotServo": IotServo,
    "IotShadow": IotShadow,
    "IotSimulator": IotSimulator,
    "IotSitewise": IotSitewise,
    "IotThermostat": IotThermostat,
    "IotThingsGraph": IotThingsGraph,
    "IotTopic": IotTopic,
    "IotTravel": IotTravel,
    "IotUtility": IotUtility,
    "IotWindfarm": IotWindfarm,

    # Management
    "AmazonDevopsGuru": AmazonDevopsGuru,
    "AmazonManagedGrafana": AmazonManagedGrafana,
    "AmazonManagedPrometheus": AmazonManagedPrometheus,
    "AmazonManagedWorkflowsApacheAirflow": AmazonManagedWorkflowsApacheAirflow,
    "AutoScaling": AutoScaling,
    "Chatbot": Chatbot,
    "CloudformationChangeSet": CloudformationChangeSet,
    "CloudformationStack": CloudformationStack,
    "CloudformationTemplate": CloudformationTemplate,
    "Cloudformation": Cloudformation,
    "Cloudtrail": Cloudtrail,
    "CloudwatchAlarm": CloudwatchAlarm,
    "CloudwatchEventEventBased": CloudwatchEventEventBased,
    "CloudwatchEventTimeBased": CloudwatchEventTimeBased,
    "CloudwatchLogs": CloudwatchLogs,
    "CloudwatchRule": CloudwatchRulediagrams.aws.management.CloudwatchRule,
    "Cloudwatch": Cloudwatch,
    "Codeguru": Codeguru,
    "CommandLineInterface": CommandLineInterface,
    "Config": Config,
    "ControlTower": ControlTower,
    "LicenseManager": LicenseManager,
    "ManagedServices": ManagedServices,
    "ManagementAndGovernance": ManagementAndGovernance,
    "ManagementConsole": ManagementConsole,
    "OpsworksApps": OpsworksApps,
    "OpsworksDeployments": OpsworksDeployments,
    "OpsworksInstances": OpsworksInstances,
    "OpsworksLayers": OpsworksLayers,
    "OpsworksMonitoring": OpsworksMonitoring,
    "OpsworksPermissions": OpsworksPermissions,
    "OpsworksResources": OpsworksResources,
    "OpsworksStack": OpsworksStack,
    "Opsworks": Opsworks,
    "OrganizationsAccount": OrganizationsAccount,
    "OrganizationsOrganizationalUnit": OrganizationsOrganizationalUnit,
    "Organizations": Organizations,
    "PersonalHealthDashboard": PersonalHealthDashboard,
    "Proton": Proton,
    "ServiceCatalog": ServiceCatalog,
    "SystemsManagerAppConfig": SystemsManagerAppConfig,
    "SystemsManagerAutomation": SystemsManagerAutomation,
    "SystemsManagerDocuments": SystemsManagerDocuments,
    "SystemsManagerInventory": SystemsManagerInventory,
    "SystemsManagerMaintenanceWindows": SystemsManagerMaintenanceWindows,
    "SystemsManagerOpscenter": SystemsManagerOpscenter,
    "SystemsManagerParameterStore": SystemsManagerParameterStore,  # alias: ParameterStore
    "SystemsManagerPatchManager": SystemsManagerPatchManager,
    "SystemsManagerRunCommand": SystemsManagerRunCommand,
    "SystemsManagerStateManager": SystemsManagerStateManager,
    "SystemsManager": SystemsManager,  # alias: SSM
    "TrustedAdvisorChecklistCost": TrustedAdvisorChecklistCost,
    "TrustedAdvisorChecklistFaultTolerant": TrustedAdvisorChecklistFaultTolerant,
    "TrustedAdvisorChecklistPerformance": TrustedAdvisorChecklistPerformance,
    "TrustedAdvisorChecklistSecurity": TrustedAdvisorChecklistSecurity,
    "TrustedAdvisorChecklist": TrustedAdvisorChecklist,
    "TrustedAdvisor": TrustedAdvisor,
    "WellArchitectedTool": WellArchitectedTool,

    # Media
    "ElasticTranscoder": ElasticTranscoder,
    "ElementalConductor": ElementalConductor,
    "ElementalDelta": ElementalDelta,
    "ElementalLive": ElementalLive,
    "ElementalMediaconnect": ElementalMediaconnect,
    "ElementalMediaconvert": ElementalMediaconvert,
    "ElementalMedialive": ElementalMedialive,
    "ElementalMediapackage": ElementalMediapackage,
    "ElementalMediastore": ElementalMediastore,
    "ElementalMediatailor": ElementalMediatailor,
    "ElementalServer": ElementalServer,
    "KinesisVideoStreams": KinesisVideoStreams,
    "MediaServices": MediaServices,

    # Migration
    "ApplicationDiscoveryService": ApplicationDiscoveryService,  # alias: ADS
    "CloudendureMigration": CloudendureMigration,  # alias: CEM
    "DatabaseMigrationService": DatabaseMigrationService,  # alias: DMS
    "DatasyncAgent": DatasyncAgent,
    "Datasync": Datasync,
    "MigrationAndTransfer": MigrationAndTransfer,  # alias: MAT
    "MigrationHub": MigrationHub,
    "ServerMigrationService": ServerMigrationService,  # alias: SMS
    "SnowballEdge": SnowballEdge,
    "Snowball": Snowball,
    "Snowmobile": Snowmobile,
    "TransferForSftp": TransferForSftp,

    # Machine Learning
    "ApacheMxnetOnAWS": ApacheMxnetOnAWS,
    "AugmentedAi": AugmentedAi,
    "Bedrock": Bedrock,
    "Comprehend": Comprehend,
    "DeepLearningAmis": DeepLearningAmis,
    "DeepLearningContainers": DeepLearningContainers,  # alias: DLC
    "Deepcomposer": Deepcomposer,
    "Deeplens": Deeplens,
    "Deepracer": Deepracer,
    "ElasticInference": ElasticInference,
    "Forecast": Forecast,
    "FraudDetector": FraudDetector,
    "Kendra": Kendra,
    "Lex": Lex,
    "MachineLearning": MachineLearning,
    "Personalize": Personalize,
    "Polly": Polly,
    "RekognitionImage": RekognitionImage,
    "RekognitionVideo": RekognitionVideo,
    "Rekognition": Rekognition,
    "SagemakerGroundTruth": SagemakerGroundTruth,
    "SagemakerModel": SagemakerModel,
    "SagemakerNotebook": SagemakerNotebook,
    "SagemakerTrainingJob": SagemakerTrainingJob,
    "Sagemaker": Sagemaker,
    "TensorflowOnAWS": TensorflowOnAWS,
    "Textract": Textract,
    "Transcribe": Transcribe,
    "Translate": Translate,

    # Mobile
    "Amplify": Amplify,
    "APIGatewayEndpoint": APIGatewayEndpoint,
    "APIGateway": APIGateway,
    "Appsync": Appsync,
    "DeviceFarm": DeviceFarm,
    "Mobile": Mobile,
    "Pinpoint": Pinpoint,

    # Network
    "APIGatewayEndpoint": APIGatewayEndpoint,
    "APIGateway": APIGateway,
    "AppMesh": AppMesh,
    "ClientVpn": ClientVpn,
    "CloudMap": CloudMap,
    "CloudFrontDownloadDistribution": CloudFrontDownloadDistribution,
    "CloudFrontEdgeLocation": CloudFrontEdgeLocation,
    "CloudFrontStreamingDistribution": CloudFrontStreamingDistribution,
    "CloudFront": CloudFront,  # alias: CF
    "DirectConnect": DirectConnect,
    "ElasticLoadBalancing": ElasticLoadBalancing,
    "ELB": ElasticLoadBalancing,
    "ElbApplicationLoadBalancer": ElbApplicationLoadBalancer,
    "ALB": ElbApplicationLoadBalancer,
    "ElbClassicLoadBalancer": ElbClassicLoadBalancer,  # alias: CLB
    "ElbNetworkLoadBalancer": ElbNetworkLoadBalancer,  # alias: NLB
    "Endpoint": Endpoint,
    "GlobalAccelerator": GlobalAccelerator,  # alias: GAX
    "InternetGateway": InternetGateway,  # alias: IGW
    "Nacl": Nacl,
    "NATGateway": NATGateway,
    "NetworkFirewall": NetworkFirewall,
    "NetworkingAndContentDelivery": NetworkingAndContentDelivery,
    "PrivateSubnet": PrivateSubnet,
    "Privatelink": Privatelink,
    "PublicSubnet": PublicSubnet,
    "Route53HostedZone": Route53HostedZone,
    "Route53": Route53,
    "RouteTable": RouteTable,
    "SiteToSiteVpn": SiteToSiteVpn,
    "TransitGatewayAttachment": TransitGatewayAttachment,  # alias: TGWAttach
    "TransitGateway": TransitGateway,  # alias: TGW
    "VPCCustomerGateway": VPCCustomerGateway,
    "VPCElasticNetworkAdapter": VPCElasticNetworkAdapter,
    "VPCElasticNetworkInterface": VPCElasticNetworkInterface,
    "VPCFlowLogs": VPCFlowLogs,
    "VPCPeering": VPCPeering,
    "VPCRouter": VPCRouter,
    "VPCTrafficMirroring": VPCTrafficMirroring,
    "VPC": VPC,
    "VpnConnection": VpnConnection,
    "VpnGateway": VpnGateway,

    # Quantum
    "Braket": Braket,
    "QuantumTechnologies": QuantumTechnologies,

    # Robotics
    "RobomakerCloudExtensionRos": RobomakerCloudExtensionRos,
    "RobomakerDevelopmentEnvironment": RobomakerDevelopmentEnvironment,
    "RobomakerFleetManagement": RobomakerFleetManagement,
    "RobomakerSimulator": RobomakerSimulator,
    "Robomaker": Robomaker,
    "Robotics": Robotics,

    # Satellite
    "GroundStation": GroundStation,
    "Satellite": Satellite,

    # Security
    "AdConnector": AdConnector,
    "Artifact": Artifact,
    "CertificateAuthority": CertificateAuthority,
    "CertificateManager": CertificateManager,  # alias: ACM
    "CloudDirectory": CloudDirectory,
    "Cloudhsm": Cloudhsm,  # alias: CloudHSM
    "Cognito": Cognito,
    "Detective": Detective,
    "DirectoryService": DirectoryService,  # alias: DS
    "FirewallManager": FirewallManager,  # alias: FMS
    "Guardduty": Guardduty,
    "IdentityAndAccessManagementIamAccessAnalyzer": IdentityAndAccessManagementIamAccessAnalyzer,  # alias: IAMAccessAnalyzer
    "IdentityAndAccessManagementIamAddOn": IdentityAndAccessManagementIamAddOn,
    "IdentityAndAccessManagementIamAWSStsAlternate": IdentityAndAccessManagementIamAWSStsAlternate,
    "IdentityAndAccessManagementIamAWSSts": IdentityAndAccessManagementIamAWSSts,  # alias: IAMAWSSts
    "IdentityAndAccessManagementIamDataEncryptionKey": IdentityAndAccessManagementIamDataEncryptionKey,
    "IdentityAndAccessManagementIamEncryptedData": IdentityAndAccessManagementIamEncryptedData,
    "IdentityAndAccessManagementIamLongTermSecurityCredential": IdentityAndAccessManagementIamLongTermSecurityCredential,
    "IdentityAndAccessManagementIamMfaToken": IdentityAndAccessManagementIamMfaToken,
    "IdentityAndAccessManagementIamPermissions": IdentityAndAccessManagementIamPermissions,  # alias: IAMPermissions
    "IdentityAndAccessManagementIamRole": IdentityAndAccessManagementIamRole,  # alias: IAMRole
    "IdentityAndAccessManagementIamTemporarySecurityCredential": IdentityAndAccessManagementIamTemporarySecurityCredential,
    "IdentityAndAccessManagementIam": IdentityAndAccessManagementIam,  # alias: IAM
    "InspectorAgent": InspectorAgent,
    "Inspector": Inspector,
    "KeyManagementService": KeyManagementService,  # alias: KMS
    "Macie": Macie,
    "ManagedMicrosoftAd": ManagedMicrosoftAd,
    "ResourceAccessManager": ResourceAccessManager,  # alias: RAM
    "SecretsManager": SecretsManager,
    "SecurityHubFinding": SecurityHubFinding,
    "SecurityHub": SecurityHub,
    "SecurityIdentityAndCompliance": SecurityIdentityAndCompliance,
    "ShieldAdvanced": ShieldAdvanced,
    "Shield": Shield,
    "SimpleAd": SimpleAd,
    "SingleSignOn": SingleSignOn,
    "WAFFilteringRule": WAFFilteringRule,
    "WAF": WAF,

    # Storage
    "Backup": Backup,
    "CloudendureDisasterRecovery": CloudendureDisasterRecovery,  # alias: CDR
    "EFSInfrequentaccessPrimaryBg": EFSInfrequentaccessPrimaryBg,
    "EFSStandardPrimaryBg": EFSStandardPrimaryBg,
    "ElasticBlockStoreEBSSnapshot": ElasticBlockStoreEBSSnapshot,
    "ElasticBlockStoreEBSVolume": ElasticBlockStoreEBSVolume,
    "ElasticBlockStoreEBS": ElasticBlockStoreEBS,  # alias: EBS
    "ElasticFileSystemEFSFileSystem": ElasticFileSystemEFSFileSystem,
    "ElasticFileSystemEFS": ElasticFileSystemEFS,  # alias: EFS
    "FsxForLustre": FsxForLustre,
    "FsxForWindowsFileServer": FsxForWindowsFileServer,
    "Fsx": Fsx,  # alias: FSx
    "MultipleVolumesResource": MultipleVolumesResource,
    "S3AccessPoints": S3AccessPoints,
    "S3GlacierArchive": S3GlacierArchive,
    "S3GlacierVault": S3GlacierVault,
    "S3Glacier": S3Glacier,
    "S3ObjectLambdaAccessPoints": S3ObjectLambdaAccessPoints,
    "SimpleStorageServiceS3BucketWithObjects": SimpleStorageServiceS3BucketWithObjects,
    "SimpleStorageServiceS3Bucket": SimpleStorageServiceS3Bucket,
    "SimpleStorageServiceS3Object": SimpleStorageServiceS3Object,
    "SimpleStorageServiceS3": SimpleStorageServiceS3,  # alias: S3
    "SnowFamilySnowballImportExport": SnowFamilySnowballImportExport,
    "SnowballEdge": SnowballEdge,
    "Snowball": Snowball,
    "Snowmobile": Snowmobile,
    "StorageGatewayCachedVolume": StorageGatewayCachedVolume,
    "StorageGatewayNonCachedVolume": StorageGatewayNonCachedVolume,
    "StorageGatewayVirtualTapeLibrary": StorageGatewayVirtualTapeLibrary,
    "StorageGateway": StorageGateway,
    "Storage": Storage,
}