<!-- High Pressure -->
## Configuration 0:
1. Warm up phase (10 seconds):
   - Fixed 1 arrival count = 1 total user
   - Each user makes 2 API calls (create group + get recommendations)
   - Total users = 1 x 10 = 10 users
   - Total API calls: 10 x 2 = 20 requests

2. Ramp up phase (60 seconds):
   - Starts at 1 user/sec, ramps to 200 users/sec linearly
   - Average rate = (1 + 200) / 2 = 100.5 users/sec
   - Total users = 100.5 x 60 = 6,030 users
   - Total API calls: 6,030 x 2 = 12,060 requests

3. Peak load phase (60 seconds):
   - Constant 50 users/sec
   - Total users = 50 x 60 = 3,000 users
   - Total API calls: 3,000 x 2 = 6,000 requests

4. Scale down phase (30 seconds):
   - Starts at 50 users/sec, ramps down to 5 users/sec
   - Average rate = (50 + 5) / 2 = 27.5 users/sec
   - Total users = 27.5 x 30 = 825 users
   - Total API calls: 825 x 2 = 1,650 requests

Final:
- Total Users: 9875 (20 + 6030 + 3000 + 825)
- Total API Requests: 19730 (20 + 12060 + 6000 + 1650)

<!-- Low Pressure -->
## Configuration 1: (~200 total users):
- Warm up: 10s x 1 user/s = 10 users
- Ramp up: 30s x avg 3 users/s = ~90 users
- Peak: 30s x 5 users/s = 150 users
- Scale down: 20s x avg 3 users/s = ~60 users
- Total: ~200 users over 90 seconds

<!-- Medium Pressure -->
## Configuration 2: (~500 total users):
- Warm up: 10s x 2 users/s = 20 users
- Ramp up: 40s x avg 6 users/s = ~240 users
- Peak: 40s x 10 users/s = 400 users
- Scale down: 20s x avg 6 users/s = ~120 users
- Total: ~500 users over 110 seconds