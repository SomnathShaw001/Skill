"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
        body: JSON.stringify({
            product: 'SkillGraph',
            message: 'Hello SkillGraph - Career Intelligence Platform',
            version: '1.0.0',
            status: 'LIVE_ON_AWS',
            hackathon: 'AWS Zero to Shipped (September 18 - October 2, 2026)',
            lane: '#startup',
            category: '#commercial-potential',
            tagline: "Your career is not a résumé. It's a continuously changing skill graph.",
            timestamp: new Date().toISOString(),
        }, null, 2),
    };
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoZWxsby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFTyxNQUFNLE9BQU8sR0FBRyxLQUFLLEVBQzFCLEtBQTJCLEVBQ0ssRUFBRTtJQUNsQyxPQUFPO1FBQ0wsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUU7WUFDUCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLDZCQUE2QixFQUFFLEdBQUc7WUFDbEMsOEJBQThCLEVBQUUsY0FBYztZQUM5Qyw4QkFBOEIsRUFBRSw2QkFBNkI7U0FDOUQ7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FDbEI7WUFDRSxPQUFPLEVBQUUsWUFBWTtZQUNyQixPQUFPLEVBQUUsaURBQWlEO1lBQzFELE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLFNBQVMsRUFBRSxzREFBc0Q7WUFDakUsSUFBSSxFQUFFLFVBQVU7WUFDaEIsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxPQUFPLEVBQUUsd0VBQXdFO1lBQ2pGLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtTQUNwQyxFQUNELElBQUksRUFDSixDQUFDLENBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBM0JXLFFBQUEsT0FBTyxXQTJCbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElHYXRld2F5UHJveHlFdmVudCwgQVBJR2F0ZXdheVByb3h5UmVzdWx0IH0gZnJvbSAnYXdzLWxhbWJkYSc7XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKFxuICBldmVudDogQVBJR2F0ZXdheVByb3h5RXZlbnRcbik6IFByb21pc2U8QVBJR2F0ZXdheVByb3h5UmVzdWx0PiA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonLFxuICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHMnOiAnR0VULCBPUFRJT05TJyxcbiAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzJzogJ0NvbnRlbnQtVHlwZSwgQXV0aG9yaXphdGlvbicsXG4gICAgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShcbiAgICAgIHtcbiAgICAgICAgcHJvZHVjdDogJ1NraWxsR3JhcGgnLFxuICAgICAgICBtZXNzYWdlOiAnSGVsbG8gU2tpbGxHcmFwaCAtIENhcmVlciBJbnRlbGxpZ2VuY2UgUGxhdGZvcm0nLFxuICAgICAgICB2ZXJzaW9uOiAnMS4wLjAnLFxuICAgICAgICBzdGF0dXM6ICdMSVZFX09OX0FXUycsXG4gICAgICAgIGhhY2thdGhvbjogJ0FXUyBaZXJvIHRvIFNoaXBwZWQgKFNlcHRlbWJlciAxOCAtIE9jdG9iZXIgMiwgMjAyNiknLFxuICAgICAgICBsYW5lOiAnI3N0YXJ0dXAnLFxuICAgICAgICBjYXRlZ29yeTogJyNjb21tZXJjaWFsLXBvdGVudGlhbCcsXG4gICAgICAgIHRhZ2xpbmU6IFwiWW91ciBjYXJlZXIgaXMgbm90IGEgcsOpc3Vtw6kuIEl0J3MgYSBjb250aW51b3VzbHkgY2hhbmdpbmcgc2tpbGwgZ3JhcGguXCIsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgfSxcbiAgICAgIG51bGwsXG4gICAgICAyXG4gICAgKSxcbiAgfTtcbn07XG4iXX0=